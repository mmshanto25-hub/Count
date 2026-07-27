const inputValue = document.getElementById('input-value');
const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const outputValue = document.getElementById('output-value');
const outputLabel = document.getElementById('output-label');
const detailFrom = document.getElementById('detail-from');
const detailTo = document.getElementById('detail-to');
const convertButton = document.getElementById('convert');
const resetButton = document.getElementById('reset');

const rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.80,
    JPY: 152.50,
    BDT: 109.50,
    INR: 83.40,
    PKR: 284.20,
    MMK: 2095.00,
    LKR: 332.00,
};

function formatCurrency(value, currency) {
    const options = {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    };
    return Number(value).toLocaleString('en-US', options);
}

function convertCurrency() {
    const amount = Number(inputValue.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (Number.isNaN(amount)) {
        outputValue.textContent = 'Enter a valid amount';
        outputLabel.textContent = 'Please type a number first.';
        detailFrom.textContent = 'From: �';
        detailTo.textContent = 'To: �';
        return;
    }

    const amountInUsd = amount / rates[from];
    const converted = amountInUsd * rates[to];

    outputValue.textContent = formatCurrency(converted, to);
    outputLabel.textContent = `${formatCurrency(amount, from)} =`;
    detailFrom.textContent = `From: ${formatCurrency(amount, from)}`;
    detailTo.textContent = `To: ${formatCurrency(converted, to)}`;
}

function resetConverter() {
    inputValue.value = '';
    fromCurrency.value = 'USD';
    toCurrency.value = 'EUR';
    outputValue.textContent = '0.00';
    outputLabel.textContent = 'Select currencies and convert an amount.';
    detailFrom.textContent = 'From: 0.00 USD';
    detailTo.textContent = 'To: 0.00 USD';
}

convertButton.addEventListener('click', convertCurrency);
resetButton.addEventListener('click', resetConverter);
inputValue.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        convertCurrency();
    }
});
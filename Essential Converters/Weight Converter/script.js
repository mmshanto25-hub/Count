const units = {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    pound: 0.45359237,
    ounce: 0.0283495231,
    ton: 1000,
    stone: 6.35029318,
};

const inputValue = document.getElementById('input-value');
const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');
const outputValue = document.getElementById('output-value');
const outputLabel = document.getElementById('output-label');
const detailFrom = document.getElementById('detail-from');
const detailTo = document.getElementById('detail-to');
const convertButton = document.getElementById('convert');
const resetButton = document.getElementById('reset');

function formatNumber(value) {
    return Number(value).toLocaleString('en-US', {
        maximumFractionDigits: 6,
        minimumFractionDigits: 2,
    });
}

function convertWeight() {
    const value = parseFloat(inputValue.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (Number.isNaN(value)) {
        outputValue.textContent = '0.00';
        outputLabel.textContent = 'Please enter a numeric value to convert.';
        detailFrom.textContent = 'From: �';
        detailTo.textContent = 'To: �';
        return;
    }

    const kilograms = value * units[from];
    const converted = kilograms / units[to];

    outputValue.textContent = formatNumber(converted);
    outputLabel.textContent = `${formatNumber(value)} ${from} equals ${formatNumber(converted)} ${to}.`;
    detailFrom.textContent = `From: ${formatNumber(value)} ${from}`;
    detailTo.textContent = `To: ${formatNumber(converted)} ${to}`;
}

function resetForm() {
    inputValue.value = '';
    fromUnit.value = 'kilogram';
    toUnit.value = 'kilogram';
    outputValue.textContent = '0.00';
    outputLabel.textContent = 'Choose units and convert a value.';
    detailFrom.textContent = 'From: 0.00 kilogram';
    detailTo.textContent = 'To: 0.00 kilogram';
}

convertButton.addEventListener('click', convertWeight);
resetButton.addEventListener('click', resetForm);

resetForm();
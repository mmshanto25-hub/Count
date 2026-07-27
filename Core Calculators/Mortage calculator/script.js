const loanAmountInput = document.getElementById('loan-amount');
const interestRateInput = document.getElementById('interest-rate');
const loanTermInput = document.getElementById('loan-term');
const paymentFrequencyInput = document.getElementById('payment-frequency');
const paymentResult = document.getElementById('payment-result');
const totalResult = document.getElementById('total-result');
const interestResult = document.getElementById('interest-result');
const calculateButton = document.getElementById('calculate-button');
const resetButton = document.getElementById('reset-button');

function formatCurrency(value) {
    return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function calculateMortgage() {
    const loanAmount = Number(loanAmountInput.value);
    const annualRate = Number(interestRateInput.value);
    const termYears = Number(loanTermInput.value);
    const periodsPerYear = Number(paymentFrequencyInput.value);

    if (!loanAmount || loanAmount <= 0 || !termYears || termYears <= 0 || annualRate < 0) {
        paymentResult.textContent = 'Enter valid values';
        totalResult.textContent = 'Enter valid values';
        interestResult.textContent = 'Enter valid values';
        return;
    }

    const totalPeriods = termYears * periodsPerYear;
    const periodicRate = annualRate / 100 / periodsPerYear;
    let payment;

    if (periodicRate === 0) {
        payment = loanAmount / totalPeriods;
    } else {
        payment = loanAmount * (periodicRate * Math.pow(1 + periodicRate, totalPeriods)) /
            (Math.pow(1 + periodicRate, totalPeriods) - 1);
    }

    const totalPayment = payment * totalPeriods;
    const totalInterest = totalPayment - loanAmount;

    paymentResult.textContent = formatCurrency(payment);
    totalResult.textContent = formatCurrency(totalPayment);
    interestResult.textContent = formatCurrency(totalInterest);
}

function resetCalculator() {
    loanAmountInput.value = '';
    interestRateInput.value = '';
    loanTermInput.value = '';
    paymentFrequencyInput.value = '12';
    paymentResult.textContent = '$0.00';
    totalResult.textContent = '$0.00';
    interestResult.textContent = '$0.00';
}

calculateButton.addEventListener('click', calculateMortgage);
resetButton.addEventListener('click', resetCalculator);

loanAmountInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        calculateMortgage();
    }
});
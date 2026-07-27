const loanAmountInput = document.getElementById('loanAmount');
const interestRateInput = document.getElementById('interestRate');
const loanTermInput = document.getElementById('loanTerm');
const paymentsPerYearInput = document.getElementById('paymentsPerYear');
const paymentValueEl = document.getElementById('paymentValue');
const totalPaidEl = document.getElementById('totalPaid');
const totalInterestEl = document.getElementById('totalInterest');
const paymentCountEl = document.getElementById('paymentCount');
const resultHintEl = document.getElementById('resultHint');
const calculateButton = document.getElementById('calculate');
const resetButton = document.getElementById('reset');

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    }).format(value);
}

function calculatePayment(principal, annualRate, termYears, periodsPerYear) {
    const ratePerPeriod = annualRate / periodsPerYear;
    const numberOfPayments = termYears * periodsPerYear;

    if (annualRate === 0) {
        return principal / numberOfPayments;
    }

    const rateFactor = Math.pow(1 + ratePerPeriod, numberOfPayments);
    return principal * ratePerPeriod * rateFactor / (rateFactor - 1);
}

function updateResults() {
    const principal = parseFloat(loanAmountInput.value) || 0;
    const interestRate = parseFloat(interestRateInput.value) || 0;
    const termYears = parseInt(loanTermInput.value, 10) || 0;
    const periodsPerYear = parseInt(paymentsPerYearInput.value, 10) || 12;
    const rateDecimal = interestRate / 100;

    if (!principal || !termYears || interestRate < 0) {
        paymentValueEl.textContent = '$0';
        totalPaidEl.textContent = '$0';
        totalInterestEl.textContent = '$0';
        paymentCountEl.textContent = '0';
        resultHintEl.textContent = 'Fill out the loan amount, rate, and term to calculate your payment schedule.';
        return;
    }

    const monthlyPayment = calculatePayment(principal, rateDecimal, termYears, periodsPerYear);
    const totalPayments = monthlyPayment * termYears * periodsPerYear;
    const totalInterest = totalPayments - principal;
    const paymentCount = termYears * periodsPerYear;

    paymentValueEl.textContent = formatCurrency(monthlyPayment);
    totalPaidEl.textContent = formatCurrency(totalPayments);
    totalInterestEl.textContent = formatCurrency(totalInterest);
    paymentCountEl.textContent = paymentCount.toString();
    resultHintEl.textContent = `Based on a ${termYears}-year loan with ${paymentsPerYearInput.selectedOptions[0].text.toLowerCase()} payments, this is your estimated payment summary.`;
}

calculateButton.addEventListener('click', updateResults);
resetButton.addEventListener('click', () => {
    loanAmountInput.value = '';
    interestRateInput.value = '';
    loanTermInput.value = '';
    paymentsPerYearInput.value = '12';
    updateResults();
});
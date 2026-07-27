const principalInput = document.getElementById('principal');
const annualContributionInput = document.getElementById('annualContribution');
const interestRateInput = document.getElementById('interestRate');
const yearsInput = document.getElementById('years');
const compoundFrequencyInput = document.getElementById('compoundFrequency');
const futureValueEl = document.getElementById('futureValue');
const totalContributionsEl = document.getElementById('totalContributions');
const interestEarnedEl = document.getElementById('interestEarned');
const effectiveRateEl = document.getElementById('effectiveRate');
const resultHintEl = document.getElementById('resultHint');
const calculateButton = document.getElementById('calculate');
const resetButton = document.getElementById('reset');

function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value);
}

function formatPercent(value) {
    return `${value.toFixed(2)}%`;
}

function calculateFutureValue(principal, annualContribution, rate, years, periods) {
    const periodicRate = rate / periods;
    const totalPeriods = periods * years;
    const contributionPerPeriod = annualContribution / periods;

    const compoundFactor = Math.pow(1 + periodicRate, totalPeriods);
    const futurePrincipal = principal * compoundFactor;
    const futureContributions = contributionPerPeriod * ((compoundFactor - 1) / periodicRate);
    return futurePrincipal + futureContributions;
}

function getEffectiveAnnualRate(rate, periods) {
    return Math.pow(1 + rate / periods, periods) - 1;
}

function updateResults() {
    const principal = parseFloat(principalInput.value) || 0;
    const annualContribution = parseFloat(annualContributionInput.value) || 0;
    const interestRate = parseFloat(interestRateInput.value) || 0;
    const years = parseFloat(yearsInput.value) || 0;
    const periods = parseInt(compoundFrequencyInput.value, 10) || 1;

    if (!years || interestRate <= 0) {
        futureValueEl.textContent = '$0';
        totalContributionsEl.textContent = '$0';
        interestEarnedEl.textContent = '$0';
        effectiveRateEl.textContent = '0%';
        resultHintEl.textContent = 'Enter a positive interest rate and investment period to calculate your result.';
        return;
    }

    const rateDecimal = interestRate / 100;
    const futureValue = calculateFutureValue(principal, annualContribution, rateDecimal, years, periods);
    const totalContributions = principal + annualContribution * years;
    const interestEarned = futureValue - totalContributions;
    const effectiveAnnualRate = getEffectiveAnnualRate(rateDecimal, periods) * 100;

    futureValueEl.textContent = formatCurrency(futureValue);
    totalContributionsEl.textContent = formatCurrency(totalContributions);
    interestEarnedEl.textContent = formatCurrency(interestEarned);
    effectiveRateEl.textContent = formatPercent(effectiveAnnualRate);
    resultHintEl.textContent = `After ${years} years with ${compoundFrequencyInput.selectedOptions[0].text.toLowerCase()} compounding, your investment grows to the value shown above.`;
}

calculateButton.addEventListener('click', updateResults);
resetButton.addEventListener('click', () => {
    principalInput.value = '';
    annualContributionInput.value = '';
    interestRateInput.value = '';
    yearsInput.value = '';
    compoundFrequencyInput.value = '12';
    updateResults();
});
const startingBalanceInput = document.getElementById('starting-balance');
const contributionAmountInput = document.getElementById('contribution-amount');
const annualRateInput = document.getElementById('annual-rate');
const yearsInput = document.getElementById('years');
const compoundFrequencyInput = document.getElementById('compound-frequency');
const contributionFrequencyInput = document.getElementById('contribution-frequency');
const currencyInput = document.getElementById('currency');
const futureValueOutput = document.getElementById('future-value');
const contributionTotalOutput = document.getElementById('contribution-total');
const interestEarnedOutput = document.getElementById('interest-earned');
const calculateButton = document.getElementById('calculate-button');
const resetButton = document.getElementById('reset-button');

function formatCurrency(value, currency) {
    if (currency === 'USDT') {
        return `${value.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })} USDT`;
    }

    return value.toLocaleString('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return a / gcd(a, b) * b;
}

function calculateSavings() {
    const startingBalance = Number(startingBalanceInput.value);
    const contributionAmount = Number(contributionAmountInput.value);
    const annualRate = Number(annualRateInput.value);
    const years = Number(yearsInput.value);
    const compoundFrequency = Number(compoundFrequencyInput.value);
    const contributionFrequency = Number(contributionFrequencyInput.value);

    if (startingBalance < 0 || contributionAmount < 0 || annualRate < 0 || !years || years <= 0) {
        futureValueOutput.textContent = 'Enter valid values';
        contributionTotalOutput.textContent = 'Enter valid values';
        interestEarnedOutput.textContent = 'Enter valid values';
        return;
    }

    const stepFrequency = lcm(compoundFrequency, contributionFrequency);
    const totalSteps = years * stepFrequency;
    const contributionInterval = stepFrequency / contributionFrequency;
    const compoundInterval = stepFrequency / compoundFrequency;
    const stepRate = annualRate / 100 / stepFrequency;

    let balance = startingBalance;
    let totalContributions = 0;
    const currency = currencyInput.value;

    for (let step = 1; step <= totalSteps; step += 1) {
        if (step % contributionInterval === 0) {
            balance += contributionAmount;
            totalContributions += contributionAmount;
        }

        if (step % compoundInterval === 0) {
            balance *= 1 + stepRate * compoundInterval;
        }
    }

    const totalInterest = balance - startingBalance - totalContributions;
    const currency = currencyInput.value;

    futureValueOutput.textContent = formatCurrency(balance, currency);
    contributionTotalOutput.textContent = formatCurrency(totalContributions, currency);
    interestEarnedOutput.textContent = formatCurrency(totalInterest, currency);
}

function resetCalculator() {
    startingBalanceInput.value = '';
    contributionAmountInput.value = '';
    annualRateInput.value = '';
    yearsInput.value = '';
    compoundFrequencyInput.value = '12';
    contributionFrequencyInput.value = '12';
    futureValueOutput.textContent = '$0.00';
    contributionTotalOutput.textContent = '$0.00';
    interestEarnedOutput.textContent = '$0.00';
}

calculateButton.addEventListener('click', calculateSavings);
resetButton.addEventListener('click', resetCalculator);

[startingBalanceInput, contributionAmountInput, annualRateInput, yearsInput].forEach(input => {
    input.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            calculateSavings();
        }
    });
});

currencyInput.addEventListener('change', () => {
    const currentFuture = Number(futureValueOutput.textContent.replace(/[^0-9.-]+/g, '')) || 0;
    const currentTotal = Number(contributionTotalOutput.textContent.replace(/[^0-9.-]+/g, '')) || 0;
    const currentInterest = Number(interestEarnedOutput.textContent.replace(/[^0-9.-]+/g, '')) || 0;

    if (currentFuture !== 0 || currentTotal !== 0 || currentInterest !== 0) {
        const currency = currencyInput.value;
        futureValueOutput.textContent = formatCurrency(currentFuture, currency);
        contributionTotalOutput.textContent = formatCurrency(currentTotal, currency);
        interestEarnedOutput.textContent = formatCurrency(currentInterest, currency);
    }
});
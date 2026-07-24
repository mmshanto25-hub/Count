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
        minimumFractionDigits: 2,
        maximumFractionDigits: 4,
    });
}

function toJoules(value, unit) {
    switch (unit) {
        case 'joules':
            return value;
        case 'calories':
            return value * 4.184;
        case 'btu':
            return value * 1055.05585;
        case 'electronvolts':
            return value * 1.602176634e-19;
        default:
            return value;
    }
}

function fromJoules(value, unit) {
    switch (unit) {
        case 'joules':
            return value;
        case 'calories':
            return value / 4.184;
        case 'btu':
            return value / 1055.05585;
        case 'electronvolts':
            return value / 1.602176634e-19;
        default:
            return value;
    }
}

function unitLabel(unit) {
    switch (unit) {
        case 'joules':
            return 'J';
        case 'calories':
            return 'cal';
        case 'btu':
            return 'BTU';
        case 'electronvolts':
            return 'eV';
        default:
            return unit;
    }
}

function convertEnergy() {
    const input = Number(inputValue.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (Number.isNaN(input)) {
        outputValue.textContent = 'Enter a number';
        outputLabel.textContent = 'Please type an energy value first.';
        detailFrom.textContent = 'From: �';
        detailTo.textContent = 'To: �';
        return;
    }

    const joules = toJoules(input, from);
    const result = fromJoules(joules, to);

    outputValue.textContent = formatNumber(result);
    outputLabel.textContent = `${formatNumber(input)} ${unitLabel(from)} =`;
    detailFrom.textContent = `From: ${formatNumber(input)} ${unitLabel(from)}`;
    detailTo.textContent = `To: ${formatNumber(result)} ${unitLabel(to)}`;
}

function resetConverter() {
    inputValue.value = '';
    fromUnit.value = 'joules';
    toUnit.value = 'calories';
    outputValue.textContent = '0.00';
    outputLabel.textContent = 'Select units and convert energy.';
    detailFrom.textContent = 'From: 0.00 J';
    detailTo.textContent = 'To: 0.00 J';
}

convertButton.addEventListener('click', convertEnergy);
resetButton.addEventListener('click', resetConverter);
inputValue.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        convertEnergy();
    }
});
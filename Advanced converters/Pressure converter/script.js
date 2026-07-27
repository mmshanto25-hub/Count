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

function toPascals(value, unit) {
    switch (unit) {
        case 'pascal':
            return value;
        case 'bar':
            return value * 100000;
        case 'psi':
            return value * 6894.75729;
        case 'atm':
            return value * 101325;
        default:
            return value;
    }
}

function fromPascals(value, unit) {
    switch (unit) {
        case 'pascal':
            return value;
        case 'bar':
            return value / 100000;
        case 'psi':
            return value / 6894.75729;
        case 'atm':
            return value / 101325;
        default:
            return value;
    }
}

function unitLabel(unit) {
    switch (unit) {
        case 'pascal':
            return 'Pa';
        case 'bar':
            return 'bar';
        case 'psi':
            return 'psi';
        case 'atm':
            return 'atm';
        default:
            return unit;
    }
}

function convertPressure() {
    const input = Number(inputValue.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (Number.isNaN(input)) {
        outputValue.textContent = 'Enter a number';
        outputLabel.textContent = 'Please type a pressure value first.';
        detailFrom.textContent = 'From: �';
        detailTo.textContent = 'To: �';
        return;
    }

    const pascals = toPascals(input, from);
    const result = fromPascals(pascals, to);

    outputValue.textContent = formatNumber(result);
    outputLabel.textContent = `${formatNumber(input)} ${unitLabel(from)} =`;
    detailFrom.textContent = `From: ${formatNumber(input)} ${unitLabel(from)}`;
    detailTo.textContent = `To: ${formatNumber(result)} ${unitLabel(to)}`;
}

function resetConverter() {
    inputValue.value = '';
    fromUnit.value = 'pascal';
    toUnit.value = 'bar';
    outputValue.textContent = '0.00';
    outputLabel.textContent = 'Select units and convert pressure.';
    detailFrom.textContent = 'From: 0.00 Pa';
    detailTo.textContent = 'To: 0.00 Pa';
}

convertButton.addEventListener('click', convertPressure);
resetButton.addEventListener('click', resetConverter);
inputValue.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        convertPressure();
    }
});

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

function toLiters(value, unit) {
    switch (unit) {
        case 'liters':
            return value;
        case 'milliliters':
            return value / 1000;
        case 'gallons':
            return value * 3.785411784;
        case 'quarts':
            return value * 0.946352946;
        case 'pints':
            return value * 0.473176473;
        default:
            return value;
    }
}

function fromLiters(value, unit) {
    switch (unit) {
        case 'liters':
            return value;
        case 'milliliters':
            return value * 1000;
        case 'gallons':
            return value / 3.785411784;
        case 'quarts':
            return value / 0.946352946;
        case 'pints':
            return value / 0.473176473;
        default:
            return value;
    }
}

function unitLabel(unit) {
    switch (unit) {
        case 'liters':
            return 'liters';
        case 'milliliters':
            return 'milliliters';
        case 'gallons':
            return 'gallons';
        case 'quarts':
            return 'quarts';
        case 'pints':
            return 'pints';
        default:
            return unit;
    }
}

function convertVolume() {
    const input = Number(inputValue.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (Number.isNaN(input)) {
        outputValue.textContent = 'Enter a number';
        outputLabel.textContent = 'Please type a volume value first.';
        detailFrom.textContent = 'From: �';
        detailTo.textContent = 'To: �';
        return;
    }

    const liters = toLiters(input, from);
    const result = fromLiters(liters, to);

    outputValue.textContent = formatNumber(result);
    outputLabel.textContent = `${formatNumber(input)} ${unitLabel(from)} =`;
    detailFrom.textContent = `From: ${formatNumber(input)} ${unitLabel(from)}`;
    detailTo.textContent = `To: ${formatNumber(result)} ${unitLabel(to)}`;
}

function resetConverter() {
    inputValue.value = '';
    fromUnit.value = 'liters';
    toUnit.value = 'milliliters';
    outputValue.textContent = '0.00';
    outputLabel.textContent = 'Select units and convert a volume.';
    detailFrom.textContent = 'From: 0.00 liters';
    detailTo.textContent = 'To: 0.00 liters';
}

convertButton.addEventListener('click', convertVolume);
resetButton.addEventListener('click', resetConverter);
inputValue.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        convertVolume();
    }
});
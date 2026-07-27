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

function toMeters(value, unit) {
    switch (unit) {
        case 'meters':
            return value;
        case 'kilometers':
            return value * 1000;
        case 'miles':
            return value * 1609.344;
        case 'yards':
            return value * 0.9144;
        case 'feet':
            return value * 0.3048;
        default:
            return value;
    }
}

function fromMeters(value, unit) {
    switch (unit) {
        case 'meters':
            return value;
        case 'kilometers':
            return value / 1000;
        case 'miles':
            return value / 1609.344;
        case 'yards':
            return value / 0.9144;
        case 'feet':
            return value / 0.3048;
        default:
            return value;
    }
}

function unitLabel(unit) {
    switch (unit) {
        case 'meters':
            return 'meters';
        case 'kilometers':
            return 'kilometers';
        case 'miles':
            return 'miles';
        case 'yards':
            return 'yards';
        case 'feet':
            return 'feet';
        default:
            return unit;
    }
}

function convertLength() {
    const input = Number(inputValue.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (Number.isNaN(input)) {
        outputValue.textContent = 'Enter a number';
        outputLabel.textContent = 'Please type a length value first.';
        detailFrom.textContent = 'From: �';
        detailTo.textContent = 'To: �';
        return;
    }

    const meters = toMeters(input, from);
    const result = fromMeters(meters, to);

    outputValue.textContent = formatNumber(result);
    outputLabel.textContent = `${formatNumber(input)} ${unitLabel(from)} =`;
    detailFrom.textContent = `From: ${formatNumber(input)} ${unitLabel(from)}`;
    detailTo.textContent = `To: ${formatNumber(result)} ${unitLabel(to)}`;
}

function resetConverter() {
    inputValue.value = '';
    fromUnit.value = 'meters';
    toUnit.value = 'kilometers';
    outputValue.textContent = '0.00';
    outputLabel.textContent = 'Select units and convert length.';
    detailFrom.textContent = 'From: 0.00 meters';
    detailTo.textContent = 'To: 0.00 meters';
}

convertButton.addEventListener('click', convertLength);
resetButton.addEventListener('click', resetConverter);
inputValue.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        convertLength();
    }
});
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

function toSquareMeters(value, unit) {
    switch (unit) {
        case 'square_meters':
            return value;
        case 'square_feet':
            return value * 0.09290304;
        case 'square_yards':
            return value * 0.83612736;
        case 'acres':
            return value * 4046.8564224;
        case 'hectares':
            return value * 10000;
        default:
            return value;
    }
}

function fromSquareMeters(value, unit) {
    switch (unit) {
        case 'square_meters':
            return value;
        case 'square_feet':
            return value / 0.09290304;
        case 'square_yards':
            return value / 0.83612736;
        case 'acres':
            return value / 4046.8564224;
        case 'hectares':
            return value / 10000;
        default:
            return value;
    }
}

function unitLabel(unit) {
    switch (unit) {
        case 'square_meters':
            return 'square meters';
        case 'square_feet':
            return 'square feet';
        case 'square_yards':
            return 'square yards';
        case 'acres':
            return 'acres';
        case 'hectares':
            return 'hectares';
        default:
            return unit;
    }
}

function convertArea() {
    const input = Number(inputValue.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (Number.isNaN(input)) {
        outputValue.textContent = 'Enter a number';
        outputLabel.textContent = 'Please type an area value first.';
        detailFrom.textContent = 'From: �';
        detailTo.textContent = 'To: �';
        return;
    }

    const squareMeters = toSquareMeters(input, from);
    const result = fromSquareMeters(squareMeters, to);

    outputValue.textContent = formatNumber(result);
    outputLabel.textContent = `${formatNumber(input)} ${unitLabel(from)} =`;
    detailFrom.textContent = `From: ${formatNumber(input)} ${unitLabel(from)}`;
    detailTo.textContent = `To: ${formatNumber(result)} ${unitLabel(to)}`;
}

function resetConverter() {
    inputValue.value = '';
    fromUnit.value = 'square_meters';
    toUnit.value = 'square_feet';
    outputValue.textContent = '0.00';
    outputLabel.textContent = 'Select units and convert an area.';
    detailFrom.textContent = 'From: 0.00 square meters';
    detailTo.textContent = 'To: 0.00 square meters';
}

convertButton.addEventListener('click', convertArea);
resetButton.addEventListener('click', resetConverter);
inputValue.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        convertArea();
    }
});
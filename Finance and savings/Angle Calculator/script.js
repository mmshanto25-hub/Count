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
        minimumFractionDigits: 4,
    });
}

function toDegrees(value, unit) {
    switch (unit) {
        case 'degrees':
            return value;
        case 'radians':
            return value * (180 / Math.PI);
        case 'grads':
            return value * 0.9;
        case 'arcminutes':
            return value / 60;
        case 'arcseconds':
            return value / 3600;
        default:
            return value;
    }
}

function fromDegrees(value, unit) {
    switch (unit) {
        case 'degrees':
            return value;
        case 'radians':
            return value * (Math.PI / 180);
        case 'grads':
            return value / 0.9;
        case 'arcminutes':
            return value * 60;
        case 'arcseconds':
            return value * 3600;
        default:
            return value;
    }
}

function unitLabel(unit) {
    switch (unit) {
        case 'degrees':
            return 'degrees';
        case 'radians':
            return 'radians';
        case 'grads':
            return 'grads';
        case 'arcminutes':
            return 'arcminutes';
        case 'arcseconds':
            return 'arcseconds';
        default:
            return unit;
    }
}

function convertAngle() {
    const input = Number(inputValue.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (Number.isNaN(input)) {
        outputValue.textContent = 'Enter a number';
        outputLabel.textContent = 'Please type an angle value first.';
        detailFrom.textContent = 'From: �';
        detailTo.textContent = 'To: �';
        return;
    }

    const degrees = toDegrees(input, from);
    const result = fromDegrees(degrees, to);

    outputValue.textContent = formatNumber(result);
    outputLabel.textContent = `${formatNumber(input)} ${unitLabel(from)} =`;
    detailFrom.textContent = `From: ${formatNumber(input)} ${unitLabel(from)}`;
    detailTo.textContent = `To: ${formatNumber(result)} ${unitLabel(to)}`;
}

function resetConverter() {
    inputValue.value = '';
    fromUnit.value = 'degrees';
    toUnit.value = 'radians';
    outputValue.textContent = '0.0000';
    outputLabel.textContent = 'Select units and convert an angle.';
    detailFrom.textContent = 'From: 0.0000 degrees';
    detailTo.textContent = 'To: 0.0000 degrees';
}

convertButton.addEventListener('click', convertAngle);
resetButton.addEventListener('click', resetConverter);
inputValue.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        convertAngle();
    }
});
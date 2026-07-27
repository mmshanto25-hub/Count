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

function toSeconds(value, unit) {
    switch (unit) {
        case 'seconds':
            return value;
        case 'minutes':
            return value * 60;
        case 'hours':
            return value * 3600;
        case 'days':
            return value * 86400;
        case 'weeks':
            return value * 604800;
        default:
            return value;
    }
}

function fromSeconds(value, unit) {
    switch (unit) {
        case 'seconds':
            return value;
        case 'minutes':
            return value / 60;
        case 'hours':
            return value / 3600;
        case 'days':
            return value / 86400;
        case 'weeks':
            return value / 604800;
        default:
            return value;
    }
}

function unitLabel(unit) {
    switch (unit) {
        case 'seconds':
            return 'seconds';
        case 'minutes':
            return 'minutes';
        case 'hours':
            return 'hours';
        case 'days':
            return 'days';
        case 'weeks':
            return 'weeks';
        default:
            return unit;
    }
}

function convertTime() {
    const input = Number(inputValue.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (Number.isNaN(input)) {
        outputValue.textContent = 'Enter a number';
        outputLabel.textContent = 'Please type a time value first.';
        detailFrom.textContent = 'From: �';
        detailTo.textContent = 'To: �';
        return;
    }

    const seconds = toSeconds(input, from);
    const result = fromSeconds(seconds, to);

    outputValue.textContent = formatNumber(result);
    outputLabel.textContent = `${formatNumber(input)} ${unitLabel(from)} =`;
    detailFrom.textContent = `From: ${formatNumber(input)} ${unitLabel(from)}`;
    detailTo.textContent = `To: ${formatNumber(result)} ${unitLabel(to)}`;
}

function resetConverter() {
    inputValue.value = '';
    fromUnit.value = 'seconds';
    toUnit.value = 'minutes';
    outputValue.textContent = '0.00';
    outputLabel.textContent = 'Select units and convert time.';
    detailFrom.textContent = 'From: 0.00 seconds';
    detailTo.textContent = 'To: 0.00 seconds';
}

convertButton.addEventListener('click', convertTime);
resetButton.addEventListener('click', resetConverter);
inputValue.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        convertTime();
    }
});
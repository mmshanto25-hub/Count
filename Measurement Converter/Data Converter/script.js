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

function toBytes(value, unit) {
    switch (unit) {
        case 'bytes':
            return value;
        case 'kilobytes':
            return value * 1024;
        case 'megabytes':
            return value * 1024 ** 2;
        case 'gigabytes':
            return value * 1024 ** 3;
        case 'terabytes':
            return value * 1024 ** 4;
        case 'petabytes':
            return value * 1024 ** 5;
        default:
            return value;
    }
}

function fromBytes(value, unit) {
    switch (unit) {
        case 'bytes':
            return value;
        case 'kilobytes':
            return value / 1024;
        case 'megabytes':
            return value / 1024 ** 2;
        case 'gigabytes':
            return value / 1024 ** 3;
        case 'terabytes':
            return value / 1024 ** 4;
        case 'petabytes':
            return value / 1024 ** 5;
        default:
            return value;
    }
}

function unitLabel(unit) {
    switch (unit) {
        case 'bytes':
            return 'bytes';
        case 'kilobytes':
            return 'KB';
        case 'megabytes':
            return 'MB';
        case 'gigabytes':
            return 'GB';
        case 'terabytes':
            return 'TB';
        case 'petabytes':
            return 'PB';
        default:
            return unit;
    }
}

function convertData() {
    const input = Number(inputValue.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (Number.isNaN(input)) {
        outputValue.textContent = 'Enter a number';
        outputLabel.textContent = 'Please type a data value first.';
        detailFrom.textContent = 'From: �';
        detailTo.textContent = 'To: �';
        return;
    }

    const bytes = toBytes(input, from);
    const result = fromBytes(bytes, to);

    outputValue.textContent = formatNumber(result);
    outputLabel.textContent = `${formatNumber(input)} ${unitLabel(from)} =`;
    detailFrom.textContent = `From: ${formatNumber(input)} ${unitLabel(from)}`;
    detailTo.textContent = `To: ${formatNumber(result)} ${unitLabel(to)}`;
}

function resetConverter() {
    inputValue.value = '';
    fromUnit.value = 'bytes';
    toUnit.value = 'kilobytes';
    outputValue.textContent = '0.00';
    outputLabel.textContent = 'Select units and convert a data size.';
    detailFrom.textContent = 'From: 0.00 bytes';
    detailTo.textContent = 'To: 0.00 bytes';
}

convertButton.addEventListener('click', convertData);
resetButton.addEventListener('click', resetConverter);
inputValue.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        convertData();
    }
});
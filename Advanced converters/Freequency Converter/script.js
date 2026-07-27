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
        minimumFractionDigits: 6,
    });
}

function toHertz(value, unit) {
    switch (unit) {
        case 'hz':
            return value;
        case 'khz':
            return value * 1e3;
        case 'mhz':
            return value * 1e6;
        case 'ghz':
            return value * 1e9;
        default:
            return value;
    }
}

function fromHertz(value, unit) {
    switch (unit) {
        case 'hz':
            return value;
        case 'khz':
            return value / 1e3;
        case 'mhz':
            return value / 1e6;
        case 'ghz':
            return value / 1e9;
        default:
            return value;
    }
}

function unitLabel(unit) {
    switch (unit) {
        case 'hz':
            return 'Hz';
        case 'khz':
            return 'kHz';
        case 'mhz':
            return 'MHz';
        case 'ghz':
            return 'GHz';
        default:
            return unit;
    }
}

function convertFrequency() {
    const input = Number(inputValue.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (Number.isNaN(input)) {
        outputValue.textContent = 'Enter a number';
        outputLabel.textContent = 'Please type a frequency value first.';
        detailFrom.textContent = 'From: �';
        detailTo.textContent = 'To: �';
        return;
    }

    const hertz = toHertz(input, from);
    const result = fromHertz(hertz, to);

    outputValue.textContent = formatNumber(result);
    outputLabel.textContent = `${formatNumber(input)} ${unitLabel(from)} =`;
    detailFrom.textContent = `From: ${formatNumber(input)} ${unitLabel(from)}`;
    detailTo.textContent = `To: ${formatNumber(result)} ${unitLabel(to)}`;
}

function resetConverter() {
    inputValue.value = '';
    fromUnit.value = 'hz';
    toUnit.value = 'khz';
    outputValue.textContent = '0.000000';
    outputLabel.textContent = 'Select units and convert a frequency.';
    detailFrom.textContent = 'From: 0.000000 Hz';
    detailTo.textContent = 'To: 0.000000 Hz';
}

convertButton.addEventListener('click', convertFrequency);
resetButton.addEventListener('click', resetConverter);
inputValue.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        convertFrequency();
    }
});
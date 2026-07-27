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

function toWatts(value, unit) {
    switch (unit) {
        case 'watts':
            return value;
        case 'kilowatts':
            return value * 1000;
        case 'horsepower':
            return value * 745.699872;
        case 'btu_per_hour':
            return value * 0.29307107;
        default:
            return value;
    }
}

function fromWatts(value, unit) {
    switch (unit) {
        case 'watts':
            return value;
        case 'kilowatts':
            return value / 1000;
        case 'horsepower':
            return value / 745.699872;
        case 'btu_per_hour':
            return value / 0.29307107;
        default:
            return value;
    }
}

function unitLabel(unit) {
    switch (unit) {
        case 'watts':
            return 'W';
        case 'kilowatts':
            return 'kW';
        case 'horsepower':
            return 'hp';
        case 'btu_per_hour':
            return 'BTU/hr';
        default:
            return unit;
    }
}

function convertPower() {
    const input = Number(inputValue.value);
    const from = fromUnit.value;
    const to = toUnit.value;

    if (Number.isNaN(input)) {
        outputValue.textContent = 'Enter a number';
        outputLabel.textContent = 'Please type a power value first.';
        detailFrom.textContent = 'From: �';
        detailTo.textContent = 'To: �';
        return;
    }

    const watts = toWatts(input, from);
    const result = fromWatts(watts, to);

    outputValue.textContent = formatNumber(result);
    outputLabel.textContent = `${formatNumber(input)} ${unitLabel(from)} =`;
    detailFrom.textContent = `From: ${formatNumber(input)} ${unitLabel(from)}`;
    detailTo.textContent = `To: ${formatNumber(result)} ${unitLabel(to)}`;
}

function resetConverter() {
    inputValue.value = '';
    fromUnit.value = 'watts';
    toUnit.value = 'kilowatts';
    outputValue.textContent = '0.00';
    outputLabel.textContent = 'Select units and convert power.';
    detailFrom.textContent = 'From: 0.00 W';
    detailTo.textContent = 'To: 0.00 W';
}

convertButton.addEventListener('click', convertPower);
resetButton.addEventListener('click', resetConverter);
inputValue.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        convertPower();
    }
});
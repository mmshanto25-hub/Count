const inputValue = document.getElementById('input-value');
const fromUnit = document.getElementById('from-unit');
const toUnit = document.getElementById('to-unit');
const outputValue = document.getElementById('output-value');
const outputLabel = document.getElementById('output-label');
const detailFrom = document.getElementById('detail-from');
const detailTo = document.getElementById('detail-to');
const convertButton = document.getElementById('convert');
const resetButton = document.getElementById('reset');

function formatTemp(value) {
    return Number(value).toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 1,
    });
}

function convertToKelvin(value, unit) {
    switch (unit) {
        case 'celsius':
            return value + 273.15;
        case 'fahrenheit':
            return (value + 459.67) * 5 / 9;
        case 'kelvin':
            return value;
        case 'rankine':
            return value * 5 / 9;
        default:
            return value;
    }
}

function convertFromKelvin(value, unit) {
    switch (unit) {
        case 'celsius':
            return value - 273.15;
        case 'fahrenheit':
            return value * 9 / 5 - 459.67;
        case 'kelvin':
            return value;
        case 'rankine':
            return value * 9 / 5;
        default:
            return value;
    }
}

function unitLabel(unit) {
    switch (unit) {
        case 'celsius':
            return '�C';
        case 'fahrenheit':
            return '�F';
        case 'kelvin':
            return 'K';
        case 'rankine':
            return '�R';
        default:
            return '';
    }
}

function convertTemperature() {
    const value = parseFloat(inputValue.value);
    const from = fromUnit.value;
    const to = toUnit.value;
    if (Number.isNaN(value)) {
        outputValue.textContent = '0.0';
        outputLabel.textContent = 'Please enter a valid temperature value.';
        detailFrom.textContent = 'From: �';
        detailTo.textContent = 'To: �';
        return;
    }

    const kelvin = convertToKelvin(value, from);
    const converted = convertFromKelvin(kelvin, to);
    const fromLabel = unitLabel(from);
    const toLabel = unitLabel(to);

    outputValue.textContent = formatTemp(converted);
    outputLabel.textContent = `${formatTemp(value)} ${fromLabel} equals ${formatTemp(converted)} ${toLabel}.`;
    detailFrom.textContent = `From: ${formatTemp(value)} ${fromLabel}`;
    detailTo.textContent = `To: ${formatTemp(converted)} ${toLabel}`;
}

function resetForm() {
    inputValue.value = '';
    fromUnit.value = 'celsius';
    toUnit.value = 'celsius';
    outputValue.textContent = '0.0';
    outputLabel.textContent = 'Select units and convert a temperature.';
    detailFrom.textContent = 'From: 0.0 �C';
    detailTo.textContent = 'To: 0.0 �C';
}

convertButton.addEventListener('click', convertTemperature);
resetButton.addEventListener('click', resetForm);

resetForm();
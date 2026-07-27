const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const bmiValue = document.getElementById('bmi-value');
const bmiLabel = document.getElementById('bmi-label');
const bmiRange = document.getElementById('bmi-range');
const calculateButton = document.getElementById('calculate');
const resetButton = document.getElementById('reset');

function formatBMI(value) {
    return value.toFixed(1);
}

function getCategory(bmi) {
    if (bmi < 18.5) return { text: 'Underweight', color: '--accent' };
    if (bmi < 25) return { text: 'Normal weight', color: '--success' };
    if (bmi < 30) return { text: 'Overweight', color: '--accent2' };
    return { text: 'Obese', color: '--danger' };
}

function updateResult() {
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);

    if (!weight || !height) {
        bmiValue.textContent = '0.0';
        bmiLabel.textContent = 'Enter your details and calculate your BMI.';
        bmiRange.textContent = 'Healthy BMI is between 18.5 and 24.9';
        return;
    }

    const heightMeters = height / 100;
    const bmi = weight / (heightMeters * heightMeters);
    const category = getCategory(bmi);

    bmiValue.textContent = formatBMI(bmi);
    bmiLabel.textContent = `Your BMI indicates ${category.text}.`;
    bmiRange.textContent = `BMI category: ${category.text} (Age ${document.getElementById('age').value || 'any'})`;

    bmiValue.style.color = `var(${category.color})`;
    bmiLabel.style.color = `var(${category.color})`;
}

calculateButton.addEventListener('click', () => {
    updateResult();
});

resetButton.addEventListener('click', () => {
    weightInput.value = '';
    heightInput.value = '';
    document.getElementById('age').value = '';
    document.getElementById('gender').value = 'other';
    bmiValue.textContent = '0.0';
    bmiValue.style.color = 'var(--text)';
    bmiLabel.textContent = 'Enter your details and calculate your BMI.';
    bmiLabel.style.color = 'var(--text)';
    bmiRange.textContent = 'Healthy BMI is between 18.5 and 24.9';
});
const previousExpression = document.getElementById('previous-expression');
const currentExpression = document.getElementById('current-expression');
const angleButtons = document.querySelectorAll('.angle-button');
let expression = '';
let evaluated = false;
let angleMode = 'DEG';

function updateDisplay() {
    currentExpression.textContent = expression || '0';
}

function setAngleMode(mode) {
    angleMode = mode;
    angleButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
}

function appendValue(value) {
    if (evaluated && !['+', '-', '*', '/', '^', '%', ')', '!'].includes(value)) {
        expression = value;
        evaluated = false;
    } else {
        if (evaluated && ['+', '-', '*', '/', '^', '%', ')', '!'].includes(value)) {
            evaluated = false;
        }
        expression += value;
    }
    updateDisplay();
}

function clearAll() {
    expression = '';
    previousExpression.textContent = '';
    evaluated = false;
    updateDisplay();
}

function deleteLast() {
    expression = expression.slice(0, -1);
    updateDisplay();
}

function degToRad(x) {
    return angleMode === 'DEG' ? x * Math.PI / 180 : x;
}

function factorial(n) {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    let result = 1;
    for (let i = 2; i <= n; i += 1) result *= i;
    return result;
}

function prepareExpression(expr) {
    let prepared = expr;
    prepared = prepared.replace(/p/g, 'pi');
    prepared = prepared.replace(/\bpi\b/g, 'Math.PI');
    prepared = prepared.replace(/\be\b/g, 'Math.E');
    prepared = prepared.replace(/\bln\(/g, 'Math.log(');
    prepared = prepared.replace(/\blog\(/g, 'Math.log10(');
    prepared = prepared.replace(/\bsqrt\(/g, 'Math.sqrt(');
    prepared = prepared.replace(/\bexp\(/g, 'Math.exp(');
    prepared = prepared.replace(/10\^/g, '10**');
    prepared = prepared.replace(/\^2/g, '**2');
    prepared = prepared.replace(/\^3/g, '**3');
    prepared = prepared.replace(/sin\(/g, 'Math.sin(degToRad(');
    prepared = prepared.replace(/cos\(/g, 'Math.cos(degToRad(');
    prepared = prepared.replace(/tan\(/g, 'Math.tan(degToRad(');
    prepared = prepared.replace(/%/g, '/100');
    return prepared;
}

function evaluateExpression() {
    if (!expression) return;
    const sanitized = expression.replace(/\s+/g, '');
    let prepared = sanitized;
    prepared = prepared.replace(/(\d+)!/g, 'factorial($1)');
    try {
        prepared = prepareExpression(prepared);
        const result = Function('Math', 'factorial', 'degToRad', `"use strict"; return (${prepared})`)(Math, factorial, degToRad);
        if (!Number.isFinite(result)) throw new Error('Invalid result');
        previousExpression.textContent = `${expression} =`;
        expression = String(result);
        evaluated = true;
        updateDisplay();
    } catch {
        currentExpression.textContent = 'Error';
        expression = '';
        evaluated = false;
    }
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        const value = button.dataset.value;
        if (action === 'clear') {
            clearAll();
            return;
        }
        if (action === 'delete') {
            deleteLast();
            return;
        }
        if (action === 'equals') {
            evaluateExpression();
            return;
        }
        if (value) {
            appendValue(value);
        }
    });
});

angleButtons.forEach(button => {
    button.addEventListener('click', () => {
        setAngleMode(button.dataset.mode);
    });
});

window.addEventListener('keydown', event => {
    const key = event.key;
    const allowed = '0123456789.+-*/()%^!';
    if (allowed.includes(key)) {
        event.preventDefault();
        appendValue(key);
        return;
    }
    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        evaluateExpression();
        return;
    }
    if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
        return;
    }
    if (key.toLowerCase() === 'c') {
        event.preventDefault();
        clearAll();
        return;
    }
});

setAngleMode('DEG');
updateDisplay();
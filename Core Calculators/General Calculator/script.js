const previousExpression = document.getElementById('previous-expression');
const currentExpression = document.getElementById('current-expression');
let expression = '';
let evaluated = false;

function updateDisplay() {
    currentExpression.textContent = expression || '0';
}

function applyValue(value) {
    if (evaluated && !['+', '-', '*', '/', '%', ')'].includes(value)) {
        expression = value;
        evaluated = false;
    } else {
        if (evaluated && ['+', '-', '*', '/', '%', '('].includes(value)) {
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

function formatExpression(expr) {
    return expr.replace(/\*/g, '�').replace(/\//g, '�');
}

function isValidExpression(expr) {
    // Allow digits, operators, parentheses, decimal and percent
    return /^[-+*/%().\d\s]*$/.test(expr);
}

function evaluateExpression() {
    if (!expression) return;
    const safeExpression = expression.replace(/�/g, '/').replace(/�/g, '*');
    if (!isValidExpression(safeExpression)) {
        currentExpression.textContent = 'Error';
        return;
    }
    try {
        const result = Function(`"use strict"; return (${safeExpression})`)();
        previousExpression.textContent = `${formatExpression(expression)} =`;
        expression = Number.isFinite(result) ? String(result) : 'Error';
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
        const value = button.dataset.value;
        const action = button.dataset.action;

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
            applyValue(value);
        }
    });
});

window.addEventListener('keydown', event => {
    const key = event.key;
    const allowed = '0123456789.+-*/%()';

    if (allowed.includes(key)) {
        event.preventDefault();
        let value = key;
        if (key === '*') value = '*';
        if (key === '/') value = '/';
        applyValue(value);
    }

    if (key === 'Enter' || key === '=') {
        event.preventDefault();
        evaluateExpression();
    }

    if (key === 'Backspace') {
        event.preventDefault();
        deleteLast();
    }

    if (key.toLowerCase() === 'c') {
        event.preventDefault();
        clearAll();
    }
});

updateDisplay()
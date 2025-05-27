let display = document.getElementById('display');
let currentInput = '';
let resultDisplayed = false;

function appendNumber(num) {
    if (resultDisplayed) {
        currentInput = '';
        resultDisplayed = false;
    }
    if (num === '.' && currentInput.endsWith('.')) return;
    currentInput += num;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && op !== '-') return;
    if (/[+\-*/%]$/.test(currentInput)) {
        currentInput = currentInput.slice(0, -1) + op;
    } else {
        currentInput += op;
    }
    resultDisplayed = false;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function calculateResult() {
    try {
        let expression = currentInput.replace(/%/g, '/100');
        let evalResult = eval(expression);
        display.textContent = evalResult;
        currentInput = evalResult.toString();
        resultDisplayed = true;
    } catch {
        display.textContent = 'Error';
        currentInput = '';
        resultDisplayed = true;
    }
}

function updateDisplay() {
    display.textContent = currentInput === '' ? '0' : currentInput;
}
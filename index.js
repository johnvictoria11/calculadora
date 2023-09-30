const displayPrevious = document.getElementById('display-anterior');
const displayCurrent = document.getElementById('display-actual');
let currentOperand = '0';
let previousOperand = '';
let operation = undefined;

function clear() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
    updateDisplay();
}

function appendNumber(number) {
    if (currentOperand === '0' || currentOperand === '-0') {
        currentOperand = number.toString();
    } else {
        currentOperand += number.toString();
    }
    updateDisplay();
}

function appendDecimal() {
    if (!currentOperand.includes('.')) {
        currentOperand += '.';
    }
    updateDisplay();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}

function negate() {
    currentOperand = (parseFloat(currentOperand) * -1).toString();
    updateDisplay();
}

function percentage() {
    currentOperand = (parseFloat(currentOperand) / 100).toString();
    updateDisplay();
}


function compute() {
    let result;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("No se puede dividir por cero.");
                clear();
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    currentOperand = result.toString();
    operation = undefined;
    previousOperand = '';
    updateDisplay();
}

function updateDisplay() {
    displayCurrent.textContent = currentOperand;
    if (operation != null) {
        displayPrevious.textContent = previousOperand;
    } else {
        displayPrevious.textContent = '';
    }
}

function backspace(){
    displayCurrent.textContent = displayCurrent.textContent.slice(0, -1);

}

document.querySelectorAll('.calculadora button').forEach(button => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent;
        switch (buttonValue) {
            case 'CE':
                clear();
                break;
            case "C":
                backspace();
                break;
            case '+/-':
                negate();
                break;
            case '%':
                percentage();
                break;
            case '=':
                compute();
                break;
            case '.':
                appendDecimal();
                break;
            case '+':
            case '-':
            case '*':
            case '/':
                chooseOperation(buttonValue);
                break;
            default:
                appendNumber(buttonValue);
        }
    });
});
const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};


function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    // Overwrite `displayValue` if the current value is '0' otherwise append to it
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
}


function inputDecimal(dot) {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = '0.'
    calculator.waitingForSecondOperand = false;
    return;
  }

  // if the 'displayValue' property does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    // Append the decimal point
    calculator.displayValue += dot;
  }
}


function handleOperator(nextOperator) {
  // Destructure the properties on the calculator object
  const { firstOperand, displayValue, operator } = calculator
  // `parseFloat` converts the string contents of `displayValue`
  // to a floating-point number
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    return;
  }
  // verify that `firstOperand` is null and that the `inputValue`
  // is not a `NaN` value
  if (firstOperand === null && !isNaN(inputValue)) {
    // Update the firstOperand property
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
};


function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
};


function backspaceCalculator() {
  calculator.displayValue = calculator.displayValue.slice(0, -1);

  if (calculator.displayValue.length === 0) {
    calculator.displayValue = '0'
  };
};


function calculate(firstOperand, secondOperand, operator) {
  if (operator === '+') {
    return firstOperand + secondOperand;
  } else if (operator === '-') {
    return firstOperand - secondOperand;
  } else if (operator === '*') {
    return firstOperand * secondOperand;
  } else if (operator === '/') {
    return firstOperand / secondOperand;
  } else if (operator === '%') {
    return firstOperand % secondOperand;
  }

  return secondOperand;
};


function updateDisplay() {
  const display = document.querySelector('.calculator-screen')
  display.value = calculator.displayValue;
};


updateDisplay();


// Mouse support
const keys = document.querySelector('.calculator-btns')
keys.addEventListener('click', event => {
  const { target } = event;
  const { value } = target;
  if (!target.matches('button')) {
    return;
  };
  handleEvent(value);
});


// Keyboard support
document.addEventListener('keyup', event => {
  const { key } = event;
  handleEvent(key);
  keyColor(key);
});


function keyColor(key) {
  switch (key) {
    case '.':
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
      document.getElementById(`digit-${key}`).classList.add('active-digit');
      setTimeout(function () { document.getElementById(`digit-${key}`).classList.remove('active-digit') }, 200);
      break;
    case '+':
    case '-':
    case '*':
    case '/':
    case '%':
      document.getElementById(`btn-${key}`).classList.add('active-operator');
      setTimeout(function () { document.getElementById(`btn-${key}`).classList.remove('active-operator') }, 200);
      break;
    case 'Enter':
      document.getElementById(`equals`).classList.add('active-equals');
      setTimeout(function () { document.getElementById(`equals`).classList.remove('active-equals') }, 200);
      break;
    case 'Delete':
      document.getElementById(`all-clear`).classList.add('active-delete');
      setTimeout(function () { document.getElementById(`all-clear`).classList.remove('active-delete') }, 200);
      break;
    case 'Backspace':
      document.getElementById(`backspace`).classList.add('active-delete');
      setTimeout(function () { document.getElementById(`backspace`).classList.remove('active-delete') }, 200);
      break;
  };
};


function handleEvent(value) {
  switch (value) {
    case '+':
    case '-':
    case '*':
    case '/':
    case '%':
    case '=':
    case 'Enter':
      handleOperator(value);
      break;
    case '.':
      inputDecimal(value);
      break;
    case 'all-clear':
    case 'Delete':
      resetCalculator();
      break;
    case 'Backspace':
    case 'backspace':
      backspaceCalculator();
      break;
    default:
      // check if the key is an integer
      if (Number.isInteger(parseFloat(value))) {
        inputDigit(value);
      };
  };

  updateDisplay();
};
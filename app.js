function add(a, b) {
  console.log(a + b);
};

function subtract(a, b) {
  console.log(a - b);
};

function multiply(a, b) {
  console.log(a * b);
};

function divide(a, b) {
  console.log(a / b);
};

function operate(operator, a, b) {
  switch (operator) {
    case 'add':
      add(a, b);
      break;

    case 'subtract':
      subtract(a, b);
      break;

    case 'multiply':
      multiply(a, b);
      break;

    case 'divide':
      divide(a, b);
      break;
  };
};

// test cases:
// operate('add', 1, 2)
// operate('subtract', 1, 2)
// operate('multiply', 1, 2)
// operate('divide', 1, 2)



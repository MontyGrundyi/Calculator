let firstNumber = null,
  operator = null,
  secondNumber = null,
  result = null;

function operate(firstNumber, operator, secondNumber) {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "*":
      return multiply(firstNumber, secondNumber);
    case "/":
      if (secondNumber !== 0) {
        return divide(firstNumber, secondNumber);
      } else {
        return "Infinite";
      }
    default:
      return firstNumber;
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function setUpOperandButton() {
  const operandButtons = document.querySelectorAll("button.operand");

  for (const button of operandButtons) {
    button.addEventListener("click", () => {
      const displayValue = button.getAttribute("value");

      if (displayValue === ".") {
        if (
          operator === null &&
          firstNumber !== null &&
          firstNumber.includes(".")
        ) {
          return;
        }
        if (
          operator === null &&
          secondNumber !== null &&
          secondNumber.includes(".")
        ) {
          return;
        }

        if (
          (operator === null && firstNumber === null) ||
          (operator !== null && secondNumber === null)
        ) {
          displayValue = "0" + displayValue;
        }
      }

      if (operator === null) {
        if (firstNumber === null) {
          firstNumber = displayValue;
        } else {
          firstNumber += displayValue;
        }
        updateDisplay(firstNumber);
      } else {
        if (secondNumber === null) {
          secondNumber = displayValue;
        } else {
          secondNumber += displayValue;
        }
        updateDisplay(secondNumber);
      }
    });
  }
}

function setUpOperatorButton() {
  const operatorButtons = document.querySelectorAll(
    ".calculator__key--operator"
  );

  for (const operatorButton of operatorButtons) {
    operatorButton.addEventListener("click", () => {
      operator = operatorButton.getAttribute("value");
    });
  }
}

function updateDisplay(value) {
  const displayElement = document.querySelector("#display");
  displayElement.textContent = value;
}

const equalKey = document.querySelector(".calculator__key--enter");
equalKey.addEventListener("click", () => {
  if (firstNumber !== null && operator !== null && secondNumber !== null) {
    result = operate(Number(firstNumber), operator, Number(secondNumber));

    if (typeof result === "number") {
      result = result;
    }
    updateDisplay(result);
  }
  firstNumber = result;
  operator = null;
  secondNumber = null;
});

const restKey = document.querySelector("#reset");
restKey.addEventListener("click", () => {
  firstNumber = null;
  operator = null;
  secondNumber = null;
  result = 0;
  updateDisplay(result);
});

const decimalButton = document.querySelector("#decimal");
decimalButton.addEventListener("click", () => {
  if (firstNumber === null && operator === null) {
    firstNumber = "0.";
    updateDisplay(firstNumber);
  } else if (operator !== null && secondNumber === null) {
    secondNumber = "0.";
    updateDisplay(secondNumber);
  } else if (
    firstNumber !== null &&
    operator === null &&
    !firstNumber.includes(".")
  ) {
    firstNumber += ".";
    updateDisplay(firstNumber);
  } else if (secondNumber !== null && !secondNumber.includes(".")) {
    secondNumber += ".";
    updateDisplay(secondNumber);
  }
});

setUpOperandButton();
setUpOperatorButton();

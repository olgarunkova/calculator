const items = document.querySelectorAll(".item");
const operators = document.querySelectorAll(".operator");
const expressionDisplay = document.querySelector(".expression");
const resultDisplay = document.querySelector(".result");

let num1 = 0;
let num2 = 0;
let operator = "";
let currentState = "waitingForTheFirstNumber";


items.forEach((button) => {
    button.addEventListener("click", () => {
       let numValue = parseInt(button.dataset.value);
       let result;
       if (currentState === "waitingForTheFirstNumber") {
        num1 = numValue;
        expressionDisplay.textContent = `${num1}`;
        resultDisplay.textContent = `${num1}`;
        currentState = "waitingForTheOperator";

       } else if (currentState === "waitingForTheSecondNumber") {
        num2 = numValue;
        expressionDisplay.textContent += `${num2}`;
        resultDisplay.textContent = `${num2}`;
        currentState = "waitingForResult";

       } else if (currentState === "waitingForResult") {
        result = operate();
        resultDisplay.textContent = `${result}`;
        expressionDisplay.textContent += ` = ${result}`;
        currentState = "waitingForTheFirstNumber";
        num1 = result;
        num2 = 0;
       };
    });
});

operators.forEach((button) => {
    button.addEventListener("click", () => {
        if (currentState === "waitingForTheOperator") {
            operator = button.dataset.value;
            expressionDisplay.textContent += ` ${operator} `;
            currentState = "waitingForTheSecondNumber";
           };
    });
});


function operate() {
    let result;
    switch (operator) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            result = num1 / num2;
            break;
    }
    return result;
}




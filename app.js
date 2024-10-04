const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equality = document.querySelector(".equality");
const clean = document.querySelector(".clean");
const expressionDisplay = document.querySelector(".expression");
const resultDisplay = document.querySelector(".result");

let num1 = "";
let num2 = "";
let operator = "";
let currentState = "waitingForTheFirstNumber";




numbers.forEach((button) => {
    button.addEventListener("click", () => {
       let numValue = button.dataset.value;
       let result;
       if (currentState === "waitingForTheFirstNumber") {
        num1 += numValue;
        expressionDisplay.textContent = `${num1}`;
        resultDisplay.textContent = `${num1}`;
        
       } else if (currentState === "waitingForTheSecondNumber") {
        num2 += numValue;
        expressionDisplay.textContent = `${num1} ${operator} ${num2}`;
        resultDisplay.textContent = `${num2}`;

       };
    });
});

operators.forEach((button) => {
    button.addEventListener("click", () => {
        currentState = "waitingForTheOperator"
        if (currentState === "waitingForTheOperator") {
            operator = button.dataset.value;
            expressionDisplay.textContent += ` ${operator} `;
            currentState = "waitingForTheSecondNumber";
           };
    });
});

equality.addEventListener("click", () => {
    currentState = "waitingForResult";
    if (currentState === "waitingForResult") {
        result = operate();
        resultDisplay.textContent = `${result}`;
        expressionDisplay.textContent += ` = ${result}`;
        num1 = result.toString();
        num2 = "";
        currentState = "waitingForTheOperator";
        expressionDisplay.textContent = `${result}`;
       };
})

clean.addEventListener("click", () => {
    num1 = "";
    num2 = "";
    expressionDisplay.textContent = "";
    resultDisplay.textContent = "";
    currentState = "waitingForTheFirstNumber";
})


function operate() {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
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




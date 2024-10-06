const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equality = document.querySelector(".equality");
const percentage = document.querySelector(".percentage");
const plusMinus = document.querySelector(".plusMinus");
const dot = document.querySelector(".dot");
const backspace = document.querySelector(".backspace");
const clean = document.querySelector(".clean");
const expressionDisplay = document.querySelector(".expression");
const resultDisplay = document.querySelector(".result");

let num1 = "";
let num2 = "";
let operator = "";
let currentState = "waitingForTheFirstNumber";
const MAX_LENGTH = 11;



numbers.forEach((button) => {
    button.addEventListener("click", () => {
       let numValue = button.dataset.value;
       if (currentState === "waitingForTheFirstNumber"
       || currentState === "waitingForTheOperator"
       ) {
        if (num1.length < MAX_LENGTH) {
            num1 += numValue;
            expressionDisplay.textContent = `${num1}`;
            resultDisplay.textContent = `${num1}`;
        };
        
       } else if (currentState === "waitingForTheSecondNumber") {
        if (num2.length < MAX_LENGTH) {
            num2 += numValue;
            expressionDisplay.textContent = `${num1} ${operator} ${num2}`;
            resultDisplay.textContent = `${num2}`;
        };
       };
    });
});

operators.forEach((button) => {
    button.addEventListener("click", () => {
        currentState = "waitingForTheOperator";
        if (currentState === "waitingForTheOperator") {
            operator = button.dataset.value;
            expressionDisplay.textContent += ` ${operator} `;
            currentState = "waitingForTheSecondNumber";
           };
    });
});
  
equality.addEventListener("click", () => {
    currentState = "waitingForResult";
    let result;
    if (currentState === "waitingForResult") {
        result = operate();
        resultDisplay.textContent = `${result}`;
        expressionDisplay.textContent += ` = ${result}`;
        num1 = result.toString();
        num2 = "";
        currentState = "waitingForTheOperator";
        expressionDisplay.textContent = `${result}`;
       };
});

percentage.addEventListener("click", () => {
    if (currentState === "waitingForTheFirstNumber") {
        num1 = (parseFloat(num1) / 100).toString();  
        expressionDisplay.textContent = `${num1}`;
        resultDisplay.textContent = `${num1}`;
    } else if (currentState === "waitingForTheSecondNumber") {
        num2 = (parseFloat(num2) / 100).toString();  
        expressionDisplay.textContent = `${num1} ${operator} ${num2}`;
        resultDisplay.textContent = `${num2}`;
    } else if (currentState === "waitingForTheOperator") {
        let pResult = (parseFloat(resultDisplay.textContent) / 100).toString(); 
        resultDisplay.textContent = `${pResult}`;
        expressionDisplay.textContent += ` = ${pResult}`;
    };
});

plusMinus.addEventListener("click", () => {
    if (currentState === "waitingForTheFirstNumber") {
        num1 =  (num1 > 0) ? (-parseFloat(num1)).toString() : (num1 * (-1)).toString();  
        expressionDisplay.textContent = `${num1}`;
        resultDisplay.textContent = `${num1}`;
    } else if (currentState === "waitingForTheSecondNumber") {
        num2 = (num2 > 0) ? (-parseFloat(num2)).toString() : (num2 * (-1)).toString();  
        expressionDisplay.textContent = `${num1} ${operator} (${num2})`;
        resultDisplay.textContent = `${num2}`;
    } else if (currentState === "waitingForTheOperator") {
        let currentResult = parseFloat(resultDisplay.textContent);
        let plusMinusResult = (currentResult > 0) ? (-currentResult).toString() : (currentResult * (-1)).toString();
        expressionDisplay.textContent = `${plusMinusResult}`;
        resultDisplay.textContent = `${plusMinusResult}`;
        num1 = plusMinusResult;
        num2 = "";
    };
});

dot.addEventListener("click", () => {
    let dotValue = dot.dataset.value;
    if (currentState === "waitingForTheFirstNumber") {
        if (!num1.includes(".")) {
            num1 += dotValue;
            expressionDisplay.textContent = `${num1}`;
            resultDisplay.textContent = `${num1}`;
        };

        } else if (currentState === "waitingForTheSecondNumber") {
        if (!num2.includes(".")) {
            num2 += dotValue;
            expressionDisplay.textContent = `${num1} ${operator} ${num2}`;
            resultDisplay.textContent = `${num2}`;
        };

        } else if (currentState === "waitingForTheOperator") {
            let dotResult = resultDisplay.textContent;
            if (!dotResult.includes(".")) {
                dotResult += ".";
                resultDisplay.textContent = `${dotResult}`;
                expressionDisplay.textContent = `${dotResult}`;
                num1 = dotResult;
                num2 = "";
            };
        };
});

backspace.addEventListener("click", () => {
    if (currentState === "waitingForTheFirstNumber") {
        num1 = num1.slice(0, -1);
        expressionDisplay.textContent = `${num1}`;
        resultDisplay.textContent = `${num1}`;
    }  else if (currentState === "waitingForTheSecondNumber" && num2) {
        num2 = num2.slice(0, -1);
        expressionDisplay.textContent = `${num1} ${operator} ${num2}`;
        resultDisplay.textContent = `${num2}`;
    } else if (currentState === "waitingForTheSecondNumber") {
        operator = operator.slice(0, -1);
        expressionDisplay.textContent = `${num1}`;
        resultDisplay.textContent = `${num1}`;
    } else if (currentState === "waitingForTheOperator") {
        let  backResult = resultDisplay.textContent.toString().slice(0, -1); 
        resultDisplay.textContent = `${backResult}`;
        expressionDisplay.textContent = "";
        expressionDisplay.textContent += ` = ${backResult}`;
        num1 = "";
        num2 = "";
    };
});

clean.addEventListener("click", () => {
    num1 = "";
    num2 = "";
    expressionDisplay.textContent = "";
    resultDisplay.textContent = "";
    currentState = "waitingForTheFirstNumber";
});


function operate() {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    if (num2 === "") num2 = num1;
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
    };
    return result;
};




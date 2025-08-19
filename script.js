const displayWindow = document.querySelector("#displayWindow");
const digitsBox = document.querySelector("#digitsBox");
const operationsBox = document.querySelector("#operationsBox")

let firstNum = '';
let operation = ''; 
let secondNum = '';
let hasFirstNum = false;
let secondTyped = false;
let hasSecondNum = false;

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
    if (b == 0) {
        firstNum = '';
        secondNum = '';
        operation = '';
        hasSecondNum = false;
        hasFirstNum = false;
        secondTyped = false;
        return 'ERROR';
    } else {
        return (a / b);
    }
}

function operate(firstNum, operation, secondNum) {
    switch (operation) {
        case "+" :
            return add(firstNum, secondNum);
        case "-" :
            return subtract(firstNum, secondNum);
        case "*" :
            return multiply(firstNum, secondNum);
        case "/" :
            return divide(firstNum, secondNum);
    }

}

// Creating digits
const arrDig = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.'];

for (let i = 0; i < arrDig.length; i++) {
    const digitBtn = document.createElement("button");
    digitBtn.classList.add("digitButtons");
    digitBtn.textContent = arrDig[i];

    digitBtn.addEventListener("click", () => {  
        const val = arrDig[i];

        // Prevent multiple decimals
        if (val === ".") {
            if (hasFirstNum) {
                if (secondNum.includes(".")) return;
            } else {
                if (firstNum.includes(".")) return;
            }
        }

        if (displayWindow.textContent == "ERROR") { 
            displayWindow.textContent = '';        
            firstNum += val;    
        }
        else if (hasFirstNum) {
            if (secondTyped) {
                secondNum += val;
            } else {
                displayWindow.textContent = '';
                secondNum += val;
                secondTyped = true;
            }
        } else {
            firstNum += val;
        }

        displayWindow.textContent += val;
    }); 

    digitsBox.appendChild(digitBtn);
}

// Creating operations
const arrOper = ["AC", "del", "+", "-", "*", "/", "="];

for (let i = 0; i < arrOper.length; i++) {
    const operBtn = document.createElement("button");
    if (arrOper[i] === "=") {
        operBtn.classList.add("equalButton");
    } else {
        operBtn.classList.add("operButtons");
    };
    operBtn.textContent = arrOper[i];

    operBtn.addEventListener("click", () => {

        switch (arrOper[i]) {

            case "AC": 
                firstNum = '';
                secondNum = '';
                operation = '';
                hasFirstNum = false;
                hasSecondNum = false;
                secondTyped = false;
                displayWindow.textContent = '';
                break;
            case "del":
                displayWindow.textContent = displayWindow.textContent.slice(0, -1);

                if (hasFirstNum && secondTyped) {
                    secondNum = secondNum.slice(0, -1);
                } else if (!hasFirstNum || !secondTyped) {
                    firstNum = firstNum.slice(0, -1);
                }
                break;
            case "=":
                if (firstNum != '' && secondNum != '') {
                    console.log(`Calculating: ${firstNum} ${operation} ${secondNum}`);
                    let finalVal = operate(parseFloat(firstNum), operation, parseFloat(secondNum));
                    displayWindow.textContent = finalVal;
                    firstNum = finalVal;
                    secondNum = '';
                    console.log(`Final Value ${finalVal}`);
                } 

                break

            default: 
                addOperation(arrOper[i]);
                break;
        };

        console.log(`Button ${arrOper[i]} was clicked`);
        console.log(`firstNum ${firstNum}`);
        console.log(`secondNum ${secondNum}`);
    });

    function addOperation(op) {
        if (hasFirstNum && secondNum !== '') {
            firstNum = operate(parseFloat(firstNum), operation, parseFloat(secondNum));
            secondNum = '';
            displayWindow.textContent = firstNum;
        } else if (!hasFirstNum) {
            if (displayWindow.textContent !== '') {  
                firstNum = parseFloat(displayWindow.textContent);
                hasFirstNum = true;
            }
        }
        operation = op; 
        secondTyped = false;
    }

    operationsBox.appendChild(operBtn);
}



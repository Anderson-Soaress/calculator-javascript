let firstNumber;
let operator;
let secondNumber;

function add(value1, value2){
    return value1 + value2
}

function subtract(value1, value2){
    return value1 - value2
}

function multiply(value1, value2){
    return value1 * value2
}

function divide(value1, value2){
    return value1 / value2
}

function operate(firstNumber, operator, secondNumber){

    let result;

    switch(operator){
        case '+':
            result = add(firstNumber, secondNumber);
            break;
        case '-':
            result = subtract(firstNumber, secondNumber);
            break;
        case '*':
            result = multiply(firstNumber, secondNumber);
            break;
        case '/':
            result = divide(firstNumber, secondNumber);
            break;
        default:
            alert('Cannot understand this operation.')
    }
    
    return result;
}
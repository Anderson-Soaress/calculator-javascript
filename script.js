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

let displayText = '';
let numbersList = [];
let numberValue;

const display = document.querySelector('#calculator_display');
const displayCurrent = document.querySelector('#calculator_current')
const numbers = document.querySelectorAll('.number');
const equal = document.querySelector('#equal');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('#clear');

numbers.forEach(number => number.addEventListener('click', () => {
    const stringNumber = number.value; // Get the value from button (value is string)

    display.placeholder = displayText += stringNumber; //Show the number on display

    numberValue = Number(displayText); 
}))

operators.forEach(operator => operator.addEventListener('click', () => {
    let lastItem;
    const stringOperator = operator.value;

    lastItem = numbersList[numbersList.length-1];
    
    if(numbersList.length == 0){ // This is to not add an operator first
        if(typeof(numberValue) == "number"){
            numbersList.push(numberValue);
            numbersList.push(stringOperator);
            display.placeholder = stringOperator;
            numberValue = undefined;
            displayText = '';
        } 
    } else { // if already have a number
        if((lastItem == '+' || lastItem == '-' || lastItem == '*' || lastItem == '/') 
            && typeof(numberValue) != "number"){ 
            // if the last item was an operator dont add one more operator, only change them
            numbersList[numbersList.length-1] = stringOperator;
            display.placeholder = stringOperator;
            numberValue = undefined;
            displayText = '';
        } else { // if the expect inputs are insert
            numbersList.push(numberValue);
            numbersList.push(stringOperator);
            display.placeholder = stringOperator;
            numberValue = undefined; 
            displayText = ''; 
        }
        //obs: the purpose of numberValue = undefined is clean the var to the if in 79 line works
        // because if you press a button number he automatically cleans numberValue and add the new value, 
        // but if you press 2 times an operator, 
        // the numberValue dont change and will add the same number to the calculation
    }

    displayCurrent.placeholder = numbersList

}))

equal.addEventListener('click', () => {

});

clear.addEventListener('click', () => {
    display.placeholder = '';
    displayCurrent.placeholder = ''
    numbersList = [];
    displayText = '';
    numberValue = undefined;
})


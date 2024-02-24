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
    return Number((value1 * value2).toFixed([2]))
}

function divide(value1, value2){
    return Number((value1 / value2).toFixed([2]))
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
let lastItem;
let res;

const display = document.querySelector('#calculator_display');
const displayCurrent = document.querySelector('#calculator_current')
const numbers = document.querySelectorAll('.number');
const equal = document.querySelector('#equal');
const operators = document.querySelectorAll('.operator');
const clear = document.querySelector('#clear');

numbers.forEach(number => number.addEventListener('click', () => {
    lastItem = numbersList[numbersList.length-1];
    if((typeof(res) == "number") 
    && !(lastItem == '+' || lastItem == '-' || lastItem == '*' || lastItem == '/')){
        clearFunction();
    } /* 
        this function is for after the result when the number button is pressed it will be understood 
        that is another calculation, but if press an operation the calculation will continue with the result as a number value
       */

    const stringNumber = number.value; // Get the value from button (value is string)

    display.placeholder = displayText += stringNumber; //Show the number on display
    
    numberValue = Number(displayText); 
}))

operators.forEach(operator => operator.addEventListener('click', () => {
    
    const stringOperator = operator.value;

    lastItem = numbersList[numbersList.length-1];
    
    if(numbersList.length == 0){ // This is to not add an operator as a first value
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
        } else if (typeof(numberValue) == 'number'){ // if the expect inputs are insert
            numbersList.push(numberValue);
            numbersList.push(stringOperator);
            display.placeholder = stringOperator;
            numberValue = undefined; 
            displayText = ''; 
        } else { 
            numbersList.push(stringOperator);
            display.placeholder = stringOperator;
            numberValue = undefined; 
            displayText = '';
        }
        /*  
        the purpose of numberValue = undefined is clean the var to the if in 90 line works
        because if you press a button number he automatically cleans numberValue and add the new value, 
        but if you press 2 times an operator, 
        the numberValue dont change and will add the same number to the calculation     
        */ 
    }


    displayCurrent.placeholder = numbersList

}))

equal.addEventListener('click', () => {
    lastItem = numbersList[numbersList.length-1];

    if(typeof(numberValue) == 'number'){ 
        if(lastItem == '+' || lastItem == '-' || lastItem == '*' || lastItem == '/'){
            numbersList.push(numberValue);
            display.placeholder = numberValue;
            numberValue = undefined; 
            displayText = ''; 
        }
    }// Add the last number for calculation, if the numberValue is a number 
     // and the last item was an operator (to not add two numbers like [2,2,+]) 
     // because the expected array is something like [number, operator, number, operator, number]


    displayCurrent.placeholder = numbersList;

    console.log(numbersList);
    if(numbersList.length >= 3){ //
        lastItem = numbersList[numbersList.length-1];
        if(!(lastItem == '+' || lastItem == '-' || lastItem == '*' || lastItem == '/') 
            && typeof(lastItem) == "number"){ // same as above, this test if the array is like the expected
                while(numbersList.length != 1){ 
                    res = operate(numbersList[0], numbersList[1], numbersList[2]);
                    numbersList.shift();
                    numbersList.shift();
                    numbersList.shift();
                    numbersList.unshift(res);
                    display.placeholder = res;
                }
            }
            /*  
            the calculation is doing this way: first call the function with the 3 first values, 
            that will be something like number, operator, number,
            then remove the 3 first values and add the result in first position,
            if have more numbers this will call the function again, 
            and now the first 3 value will be: result,operator that was in 4 position, number was in 5 position,
            this will keep going until the numbers.lenght reach 1.
            */
    }
});

function clearFunction(){
    display.placeholder = '';
    displayCurrent.placeholder = ''
    numbersList = [];
    displayText = '';
    numberValue = undefined;
    res = undefined;
}
clear.addEventListener('click', clearFunction);
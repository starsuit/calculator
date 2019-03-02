let calcMode  = false;
let pointMode = true;

let on = document.querySelector(".on");
let equals = document.querySelector(".equals");
let numberButtons = document.querySelectorAll(".number");
let operatorButtons = document.querySelectorAll(".operator");
let screen = document.querySelector(".screen"); //max characters 14?
let total = "";
let screenTotal = "";
let num1;
let num2;
let prevOperator= "=";

function wipe() {
  console.log("wipe");
  total = "";
  screenTotal = "";
  screen.textContent = "";
  calcMode = false;
  pointMode = true;
  num1 = undefined;
  num2 = undefined;
  prevOperator = "=";
  console.clear();
}

function handleNumberButton(content) {
 // const content = button.textContent;
  // console.log(button.textContent);
  // console.log(pointMode);
  if (screen.textContent.length < 13) {    
    if (content === ".") {
      if (pointMode === true) screenTotal += content; 
      pointMode = false;
    }
    else {      
      screenTotal += content;
    }
  }
  total = screenTotal;
  screen.textContent = screenTotal;
   console.log({total, screenTotal, num1, num2, operator: content, prevOperator})
}

function handleOperatorButton(operator) { 
  if (calcMode === false) {   
   num1 = parseFloat(total); 
   // num2 = undefined;
  }
  else {
   num2 = parseFloat(total);
  }
  // let operator = button.textContent;
  let func = obj[prevOperator];
  let funcResult = func(num1, num2);
  num1 = funcResult; 
  num2 = undefined;
  total = funcResult;
  screen.textContent = funcResult;
  screenTotal = "";
  calcMode = true;
  pointMode = true;
  prevOperator = operator;
   console.log({total, screenTotal, num1, num2, operator, prevOperator})
}

function equal(a, b) {
  // screenTotal = total;
  // screen.textContent = total;
  // calcMode = false;
  // console.log(calcMode)
  // let prevFunc = obj[prevOperator];
  // return prevFunc(a, b);
  // prevOperator = undefined;
  return a;
}

function add(a, b = 0) {
  return a + b;
}

function subtract(a, b = 0) {
  return a - b;
}

function multiply(a, b = 1) {
  return a * b;
}

function divide(a, b = 1) {
  return a / b;
}

function power(a, b = 1) {
  return Math.pow(a,b);
}

function sqrt(a) {
  return Math.sqrt(a);
}

// function plusminus(a, b) {
//   return a * -1;
// }


let obj = {
  "+" : add,
  "-" : subtract,
  "×" : multiply,
  "*" : multiply,
  "÷" : divide,
  "/" : divide,
  "^" : power,
  "=" : equal,
  " " : equal,
  "√" : sqrt
}

numberButtons.forEach(function(button) {
  button.addEventListener("click", myFunction => handleNumberButton(button.textContent));
} )

operatorButtons.forEach(function(button) {
  button.addEventListener("click", myFunction => handleOperatorButton(button.textContent));
} )

document.addEventListener("keydown", event => {
  const keyName = event.key;
  console.log(keyName);
  if (obj[keyName]) {
    handleOperatorButton(keyName);
  }
  else if (Number.isNaN(parseInt(keyName))) {
   if (keyName === "Escape")  wipe(); 
  }
  
  else {
    handleNumberButton(keyName);
  }
});

on.addEventListener("click", wipe);
// equals.addEventListener("click", equal);
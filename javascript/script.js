const screenText = document.getElementById("screen-text")
const preText = document.getElementById("prescreen-text")
let evaluated = false
let operator = ""
let changeText = true
let firstNum = ""
let secondNum = ""
let storedVal = ""
let lastOp = ""

function valueClicked(btn){
  console.log(btn)
  if(screenText.textContent.substr(-1) == "." && btn.getAttribute("data-decimal") == "."){
    console.log("no")
  }else{
    
    if(changeText){
      if(btn.getAttribute("data-decimal") == "."){
        screenText.textContent = "0"
        changeText = false;
      }else{
        changeText = false
        screenText.textContent = ""
      }
      
      
    }
    if(evaluated){
      screenText.textContent = "0"
      preText.textContent = ""
      firstNum = ""
      secondNum = ""
      evaluated = false
    }
    screenText.textContent += btn.textContent
    storedVal = screenText.textContent
    
    lastClick = btn.textContent
  }
  
}

function formatNum(num){

  if(num.substr(-1) == "."){
    
    return num.slice(0, -1).toString()
  }
  return num.toString()
}

function backspaceClicked(){

  if(screenText.textContent.length > 0 && screenText.textContent != "0" && !evaluated && !changeText){
    if(screenText.textContent.length == 1){
      screenText.textContent = "0"
      changeText = true
      storedVal = "0"
    }else{
      screenText.textContent = screenText.textContent.slice(0, -1)
    }
    
  }
}

function operatorClicked(btn){
  console.log(storedVal)
  if(operator != ""){
    lastOp = operator
  }
  operator = btn.getAttribute("data-operator")
  if(evaluated){
    preText.textContent = screenText.textContent + " " + operator
    storedVal = screenText.textContent
    evaluated = false
  }
  if(!changeText){
    if(firstNum == ""){
      if(screenText.textContent != "0"){
        screenText.textContent = formatNum(screenText.textContent)
        firstNum = formatNum(screenText.textContent)
        preText.textContent = firstNum + " " + operator + " " 
        changeText = true
      }
      }else{
        secondNum = formatNum(screenText.textContent)
        
        firstNum = evalEquation(lastOp)
        preText.textContent = firstNum + " " + operator
        screenText.textContent = firstNum
        secondNum = ""
        changeText = true
    }
  }
}
function equalClicked(){

  if(firstNum != ""){
    if(screenText.textContent != ""){
      secondNum = storedVal
      
      console.log(typeof(firstNum) + " " + secondNum)
      preText.textContent = formatNum(firstNum) + " " + operator + " " + formatNum(secondNum)  + " ="
      firstNum = evalEquation(operator)
      secondNum = ""
      
      screenText.textContent = firstNum
      changeText = true
      evaluated = true
    }
  }
}

function evalEquation(op){
  changeText = true;
  let floatFirst = parseFloat(firstNum)
  let floatSecond = parseFloat(secondNum)
  switch(op){
    case "*":
      return ((Math.round(((floatFirst * floatSecond) + Number.EPSILON) * 100)) / 100).toString();
    case "/":
      return ((Math.round(((floatFirst / floatSecond) + Number.EPSILON) * 100)) / 100).toString();
    case "-":
      return ((Math.round(((floatFirst - floatSecond) + Number.EPSILON) * 100) / 100)).toString();
    case "+":
      return ((Math.round(((floatFirst + floatSecond) + Number.EPSILON) * 100)) / 100).toString();
  }
}

function clearClicked(){
  firstNum = ""
  secondNum = ""
  screenText.textContent = "0"
  operator = ""
  preText.textContent = ""
  evaluated = false
  changeText = true
}


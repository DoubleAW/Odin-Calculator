const keys = document.getElementById("keys");
const screenText = document.getElementById("screen-text")
let equation = "";
let prevEquation = ""
let operator = ""
let changeText = false
let firstNum = ""
let secondNum = ""
let lastClick = ""
let storedVal = ""
function digitClicked(btn){
  if(changeText){
    changeText = false
    screenText.textContent = ""
  }
  
  screenText.textContent += btn.textContent

}

function operatorClicked(btn){
  operator = btn.getAttribute("data-operator")
  if(!changeText){
    if(firstNum == ""){
      if(screenText.textContent != ""){
        firstNum = screenText.textContent
        changeText = true
      }
      }else{
        secondNum = screenText.textContent
        firstNum = evalEquation(operator)
        screenText.textContent = firstNum
        secondNum = ""
        changeText = true
    }
  }
}
function equalClicked(){
  
  if(firstNum != "" && !changeText){
    console.log(firstNum)
    if(screenText.textContent != ""){
      secondNum = screenText.textContent
      console.log("first num: " + firstNum + " second num: " + secondNum)
      firstNum = evalEquation(operator)
      secondNum = ""
      screenText.textContent = firstNum
      console.log(firstNum)
      changeText = true
    }
  }
}

function evalEquation(op){
  if(!changeText){
    changeText = true;
    switch(op){
      case "*":
        return (parseFloat(firstNum) * parseFloat(secondNum)).toString();
      case "/":
        return (parseFloat(firstNum) / parseFloat(secondNum)).toString();
      case "-":
        return (parseFloat(firstNum) - parseFloat(secondNum)).toString();
      case "+":
        return (parseFloat(firstNum) + parseFloat(secondNum)).toString();
    }
  }
  
}

function clearClicked(){
  firstNum = ""
  secondNum = ""
  screenText.textContent = "0"
  changeText = true
}
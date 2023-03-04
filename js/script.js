let tempArray = [];
const errorMsg = 'Invalid';
let themeChoice;
let firstValue = true;
let answerRetained = false;

/* *** Code Outline ***
  1. Theme Functions
  2. Screen Printing Functions
  3. Calculation Functions
  4. User Interaction Functions
  5. Error Checking/Avoidance Functions
*/

// *** Theme Functions ***
function changeTheme(value) {
  let theme;
  switch (value) {
    case '0':
      $('body').removeClass('theme-2');
      $('body').removeClass('theme-3');
      $('body').addClass('theme-1');
      theme = '0';
      break;
    case '1':
      $('body').removeClass('theme-1');
      $('body').removeClass('theme-3');
      $('body').addClass('theme-2');
      theme = '1';
      break;
    case '2':
      $('body').removeClass('theme-1');
      $('body').removeClass('theme-2');
      $('body').addClass('theme-3');
      theme = '2';
      break;
  
    default:
      break;
  }
  sessionStorage.setItem("theme", theme);
}
function checkThemePreference() {
  // let darkCheck = window.matchMedia("(prefers-color-scheme:dark)").matches;
  if(window.matchMedia("(prefers-color-scheme:dark)").matches) {
    changeTheme('2');
    $('#theme-slider').val('2');
  }
  if(window.matchMedia("(prefers-color-scheme:light)").matches) {
    changeTheme('1');
    $('#theme-slider').val('1');
  }
}

// *** Screen Printing Functions ***
function arrayToString() {
  let text = '';
  tempArray.forEach(item => {
    if (isNaN(item) && item!='.') {
      text += ` ${item} `;
    } else {
      text += item;
      let temp = text.split(' ');
      let i = temp.length - 1;
      temp[i] = temp[i].replace(",", "");
      if (!isNaN(temp[i])) {
        temp[i] = temp[i].replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      }
      text = temp.join(' ');
    }
  });
  return text;
}
function printToScreen() {
  let screenText = arrayToString();
  $('#screen-text').text(screenText);
}
function printAnswer(answer) {
  tempArray = answer; // allows user to include answer in next calculation
  answerRetained = true;
  arrayToString(); // add any necessary commas
  let screenText = tempArray[0];
  if (!isNaN(screenText)) {
    if (!Number.isInteger(screenText)) {
      // limit decimals shown to 5 but hide any trailing zeros after the decimal point
      screenText = parseFloat(screenText.toFixed(5));
    }
  }
  $('#screen-text').text(screenText);
}
function printError() {
  $('.error-notice').fadeIn();
  setTimeout(() => {
    $('.error-notice').fadeOut();
  }, 1500);
}

// *** Calculation Functions ***
function addition(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    return errorMsg;
  }
  // parseFloat num1 and num2 so that they aren't concatenated as strings
  let solution = parseFloat(num1) + parseFloat(num2);
  return solution;
}
function subtract(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    return errorMsg;
  }
  let solution = num1 - num2;
  return solution;
}
function multiply(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    return errorMsg;
  }
  let solution = num1 * num2;
  return solution;
}
function divide(num1, num2) {
  if (isNaN(num1) || isNaN(num2)) {
    return errorMsg;
  }
  let solution = num1 / num2;
  return solution;
}
function checkAdd(array) {
  let i = 0;
  let addNums = 0;
  let hasAddition = false;
  let num1 = 0; // num1 is 0 in case there is no number preceeding the first + sign
  let num2;
  let order;
  console.log(array);
  for (i; i<array.length; i++) {
    if (addNums<2) {
      if (isNaN(array[i])) {
        if (array[i]=='+') {
          addNums++;
          hasAddition = true;
          order = i;
        }
      } else {
        if (addNums<1) {
          if (array[i]!="") {
            num1 = array[i];
          }
        } else {
          if (hasAddition) {
            num2 = array[i];
            addNums++;
          }
        }
      }
    }
    console.log(`Number 1 is: ${num1}`);
  }
  let result = {has: hasAddition, num1: num1, num2: num2, order: order, operation: '+'};
  return result;
}
function checkSubtraction(array) {
  let i = 0;
  let subNums = 0;
  let hasSubtraction = false;
  let num1 = 0; // num1 is 0 in case the first number is a negative number
  let num2;
  let order;
  for (i; i<array.length; i++) {
    if (subNums<2) {
      if (isNaN(array[i])) {
        if (array[i]=='-') {
          subNums++;
          hasSubtraction = true;
          order = i;
        }
      } else {
        if (subNums<1) {
          if (array[i]!="") {
            num1 = array[i];
          }
        } else {
          if (hasSubtraction) {
            num2 = array[i];
            subNums++;
          }
        }
      }
    }
  }
  let result = {has: hasSubtraction, num1: num1, num2: num2, order: order, operation: '-'};
  return result;
}
function checkMultiply(array) {
  let i = 0;
  let multiplyNums = 0;
  let hasMultiplication = false;
  let num1;
  let num2;
  let order;
  for (i; i<array.length; i++) {
    if (multiplyNums<2) {
      if (isNaN(array[i])) {
        if (array[i]=='x') {
          multiplyNums++;
          hasMultiplication = true;
          order = i;
        }
      } else {
        if (multiplyNums<1) {
          num1 = array[i];
        } else {
          if (hasMultiplication) {
            num2 = array[i];
            multiplyNums++;
          }
        }
      }
    }
  }
  let result = {has: hasMultiplication, num1: num1, num2: num2, order: order, operation: 'x'};
  return result;
}
function checkDivide(array) {
  let i = 0;
  let divisionNums = 0;
  let hasDivision = false;
  let num1;
  let num2;
  let order;
  for (i; i<array.length; i++) {
    if (divisionNums<2) {
      if (isNaN(array[i])) {
        if (array[i]=='/') {
          divisionNums++;
          hasDivision = true;
          order = i;
        }
      } else {
        if (divisionNums<1) {
          num1 = array[i];
        } else {
          if (hasDivision) {
            num2 = array[i];
            divisionNums++;
          }
        }
      }
    }
  }
  let result = {has: hasDivision, num1: num1, num2: num2, order: order, operation: '/'};
  return result;
}
function doCalc(toCalc) {
  let workingArray = toCalc;

  for (let i=0; i<toCalc.length; i++) {
    let mulCheckResult = checkMultiply(workingArray);
    let divCheckResult = checkDivide(workingArray);
    let addCheckResult = checkAdd(workingArray);
    let subCheckResult = checkSubtraction(workingArray);
    // Calculate multiplication and division first
    if (mulCheckResult.has) {
      if (divCheckResult.has) {
        if (mulCheckResult.order < divCheckResult.order) {
          let holdVal = multiply(mulCheckResult.num1, mulCheckResult.num2);
          let start = mulCheckResult.order - 1;
          workingArray.splice(start, 3, holdVal);
        } else {
          let holdVal = divide(divCheckResult.num1, divCheckResult.num2);
          let start = divCheckResult.order - 1;
          workingArray.splice(start, 3, holdVal);
        }
      } else {
        let holdVal = multiply(mulCheckResult.num1, mulCheckResult.num2);
        let start = mulCheckResult.order - 1;
        workingArray.splice(start, 3, holdVal);
      }
    } else if (divCheckResult.has) {
      let holdVal = divide(divCheckResult.num1, divCheckResult.num2);
      let start = divCheckResult.order - 1;
      workingArray.splice(start, 3, holdVal);
    } else {
      // Then do addition and subtractions
      if (addCheckResult.has) {
        if (subCheckResult.has) {
          if (addCheckResult.order < subCheckResult.order) {
            let holdVal = addition(addCheckResult.num1, addCheckResult.num2);
            let start = addCheckResult.order - 1;
            workingArray.splice(start, 3, holdVal);
          } else {
            let holdVal = subtract(subCheckResult.num1, subCheckResult.num2);
            let start = subCheckResult.order - 1;
            workingArray.splice(start, 3, holdVal);
          }
        } else {
          let holdVal = addition(addCheckResult.num1, addCheckResult.num2);
          let start = addCheckResult.order - 1;
          workingArray.splice(start, 3, holdVal);
        }
      } else if (subCheckResult.has) {
        let holdVal = subtract(subCheckResult.num1, subCheckResult.num2);
        let start = subCheckResult.order - 1;
        workingArray.splice(start, 3, holdVal);
      } else {
        i = toCalc.length; // End the loop
      }
    }
    console.log(workingArray);
  }
  printAnswer(workingArray);
}

// *** User Interaction Functions ***
function decideAction(value) {
  if (value!='del' && value!="reset" && value!='=') {
    let valid = checkInput(value);
    if (valid) {
      tempArray.push(value);
      printToScreen();
    } else {
      printError();
    }
  } else if (value=='del') {
    tempArray.pop();
    printToScreen();
  } else if (value=='reset') {
    tempArray = [];
    printToScreen();
  } else {
    findAnswer();
  }
}
function findAnswer() {
  let tempString = arrayToString();
  tempString = tempString.replaceAll(",", "");
  let toCalc = tempString.split(' ');
  doCalc(toCalc);
}

// *** Error Checking/Avoidance Function ***
function checkInput(value) {
  if (tempArray.length < 1) {
    if (value=='x' || value=='/') {
      answerRetained = false;
      return false;
    }
  } else {
    const prevValue = tempArray.length - 1;
    console.log(tempArray[prevValue]);
    if (isNaN(tempArray[prevValue])) {
      if (tempArray[prevValue]=='.' && value=='.') {
        return false;
      }
      if (tempArray[prevValue]!='.' && isNaN(value) && value!='.') {
        return false;
      }
    }
  }
  if (answerRetained && tempArray.length==1 && value!='x' && value!='/' && value!='+' && value!='-') {
    tempArray = [];
    answerRetained = false;
  }
  return true;
}

$(window).on("load", function(){
  if (sessionStorage.getItem('theme')) {
    changeTheme(sessionStorage.getItem('theme'));
  } else {
    checkThemePreference();
  }

  // Event Listeners
  $('.key').click(function(){
    const value = $(this).val();
    decideAction(value);
  });

  $('#theme-slider').change(function(){
    const value = $(this).val();
    console.log(value);
    changeTheme(value);
    themeChoice = value;
  });
});
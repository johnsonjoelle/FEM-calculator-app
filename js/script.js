let toCalculate = {};
let tempArray = [];
let arrayNum = 0;
let arrayOperator = 0;
let numLength = 0;
const error = "Invalid input";
let themeChoice;


// push to tempArray
// pop tempArray when del is pressed
// when = is pressed, loop through tempArray 
// store numbers to string until next array is an operator
// convert the number-string to a float
// add float to toCalculate object using "toCalculate[`num${arrayNum}`] = float"
// add operator (not =) to object using "toCalculate[`operator${arrayOperator}`] = operator"
// repeat for however many of each are added.


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

function decideAction(value) {
  if (value!='del' && value!="reset" && value!='=') {
    tempArray.push(value);
  } else if (value=='del') {
    tempArray.pop();
  } else if (value=='reset') {
    tempArray = [];
  } else {
    findAnswer();
  }
  printToScreen();
}
function findAnswer() {
  let tempString = arrayToString();
  let toCalc = tempString.split(' ');
  for(let i=0; i<toCalc.length; i++) {
    toCalc[i] = toCalc[i].replace(",", "");
  }
  console.log(toCalc);

}
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

$(window).on("load", function(){
  // changeTheme($('#theme-slider').val());
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
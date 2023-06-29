// Set up flaps ////////////////////////////////////////////
speed = .4; // seconds
currentTime = getCurrentTime().toUpperCase().split("");

amountOfFlaps = 8; // Number of flaps for displaying time (HH:MM:SS)

div = document.querySelector(".center");
html = "";
for (var x = 0; x < amountOfFlaps; x++) {
    if(x == 2 || x ==5)
        html +='<span id="gan"> : </span>'
    else
        html += '<div class=splitflap><div class="top"></div><div class="bottom"></div><div class="nextHalf"></div><div class="nextFull"></div></div>';
}
amountOfFlaps = 6;

div.innerHTML = html;

// Set up more stuff ///////////////////////////////////////
a1 = document.querySelectorAll(".top");
a2 = document.querySelectorAll(".bottom");
b1 = document.querySelectorAll(".nextFull");
b2 = document.querySelectorAll(".nextHalf");

for (var x = 0; x < a1.length; x++) {
  a2[x].style.animationDuration = speed + "s";
  b2[x].style.animationDuration = speed + "s";
}

// And even more ///////////////////////////////////////////
char = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

strCount = [], flag = [];

for (var x = 0; x < amountOfFlaps; x++) {
  strCount[x] = char.indexOf(currentTime[x]);
  flag[x] = false, flag2 = true;
}

// Flip them flaps /////////////////////////////////////////
setInterval(function() {
  currentTime = getCurrentTime().toUpperCase().split(""); // Update current time

  for (var x = 0; x < amountOfFlaps; x++) {
    if (b1[x].innerHTML == currentTime[x]) dontFlipIt(x);
    else flipIt(x);

    if (flag.every(function(e) {
        return e
      }) && flag2) flag2 = false, changeDestination();
  }
}, speed * 1000);


////////////////////////////////////////////////////////////
// Flap flipping functions /////////////////////////////////
////////////////////////////////////////////////////////////
function flipIt(x) {
  a1[x].innerHTML = char[(strCount[x] == 0) ? char.length - 1 : strCount[x] - 1];
  a2[x].innerHTML = char[(strCount[x] == 0) ? char.length - 1 : strCount[x] - 1];
  b1[x].innerHTML = char[strCount[x]];
  b2[x].innerHTML = char[strCount[x]];

  a2[x].classList.remove("flip1");
  a2[x].offsetWidth = a2[x].offsetWidth;
  a2[x].classList.add("flip1");
  b2[x].classList.remove("flip2");
  b2[x].offsetWidth = b2[x].offsetWidth;
  b2[x].classList.add("flip2");

  if (strCount[x] > char.length - 2) strCount[x] = 0;
  else strCount[x]++;
}

function dontFlipIt(x) {
  flag[x] = true;
  a2[x].classList.remove("flip2");
  a2[x].style.backgroundColor = "#B87333";
  b2[x].style.backgroundColor = "#B87333";
  a1[x].innerHTML = char[(strCount[x] == 0) ? char.length - 1 : strCount[x] - 1];
  a2[x].innerHTML = char[(strCount[x] == 0) ? char.length - 1 : strCount[x] - 1];
}

function changeDestination() {
  setTimeout(function() {
    flag.fill(false);
    flag2 = true;
  }, 3000);
}

function getCurrentTime() {
  // Get current time in HH:MM:SS format
  var date = new Date();
  var hours = date.getHours().toString().padStart(2, '0');
  var minutes = date.getMinutes().toString().padStart(2, '0');
  var seconds = date.getSeconds().toString().padStart(2, '0');
  return hours + minutes +  seconds;
}

//Changes text when a mouseover event happens
function mOver(obj) {
  obj.innerHTML = "To Our About Page";
}
//Changes text when a mouseout event happens
function mOut(obj) {
  obj.innerHTML = "Take A Look Around";
}

function changeText(id) {
  id.innerHTML = "Something else";
}

//Zooms in to a picture
function zoomIn() {
  var img = document.getElementById("image");
  img.style.height = "500px";
  img.style.width - "800px";
}

//Zooms out of a picture
function zoomOut() {
  var img = document.getElementById("image");
  img.style.height = "100px";
  img.style.width = "100px";
}
//Changes an image  based on the event
function changeImage() {
  var img = document.getElementById("image");
  img.src = "Images/Employees/Manu.png";
}

function changeImageBack() {
  var img = document.getElementById("image");
  img.src = "Images/Employees/Manu.png";
}

//Adds an animation effect to the login and signin icons when being used
document.getElementById("log").addEventListener("click", function rotateLogIn() {
    this.classList.add("loading");
    this.innerHTML = "<span class='icon'> &#8635;</span>Logging In...";
  });
document
  .getElementById("btnSign")
  .addEventListener("click", function rotateSignIn() {
    this.classList.add("loading");
    this.innerHTML = "<span class='icon'> &#8635;</span>Signing In...";
  });

//Decreases or increases the opacity of an image
function opacity() {
  var image = document.getElementById("image");
  var opacity = "0.7";
  image.style.opacity = opacity;
}
function opacityBack() {
  var image = document.getElementById("image");
  var opacity = "1";
  image.style.opacity = opacity;
}
//Alerts the user when they are online
function online() {
  alert("You are online!");
}
//Alerts the user when they are offline
function offline() {
  alert("You are offline!");
}
//Scrolls down to the bottom of the page
function scrollDown() {
  var height = device-height;
  window.scrollTo(0 , document.body.scrollHeight);
  window.scrollBy(0, 1000);
}
//Scrolls up to the top of the page
function scrollUp() {
  window.scroll(0, 0);
}
//Shows and hides passwords
var a;
function pass() {
  if (a == 1) {
    document.getElementById("password").type = "password";
    document.getElementById("pass-icon").src =
      "Images/Car Sale Website Images/hide_pass.jpg";
    a = 0;
  } else {
    document.getElementById("password").type = "text";
    document.getElementById("pass-icon").src =
      "Images/Car Sale Website Images/show_pass.jpg";
    a = 1;
  }
}
//Opens a link
function openlink() {
  window.open(
    "https://www.mercedes-benz.co.za/passengercars.php?group=all&subgroup=see-all&view=BODYTYPE"
  );
}

document.addEventListener('onclick', 
function rotate(){
  const log= document.getElementById('log');
  log.classList.add('rotate-animation');
});

//function popup(){
//  alert("Contact our staff:\n Casey Chuma:068 099 3179\n Roland Chuma: 061 585 0984\n Emmanuel Musiiwa: 078 994 2877");
//}


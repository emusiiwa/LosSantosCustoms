/* //adds some text to the already exisiting logo
const para = document.createElement("p");
const node = document.createTextNode("This is new.");
para.appendChild(node);
const element = document.getElementById("logo");
element.appendChild(para);

//add an event listener to the logo area
document.getElementById("blog").addEventListener("click", function() {
    alert("You clicked blog link!");
}, false);


//when you mouse over the logo it shows los santoooos customs
var x = document.getElementById("logo");
x.addEventListener("mouseover", myFunction);

function myFunction() {
    document.getElementById("logo").innerHTML += "Los Santooooos Customs";
}


// Handling events
p.addEventListener("click", () => {
    alert("Paragraph clicked!");
});

//modifies the logo
const pageTitle = document.getElementById("logo");
pageTitle.textContent = "LSC";
 */
//asks the user to allow location access or not
/* if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // Use the user's location for location-specific features
        // Example: Display the user's location on the page
        const locationElement = document.getElementById("location");
        alert(locationElement.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`);

    });
} */

//this tells the user if cookies are enabled or not
/* if (window.navigator.cookieEnabled){
	alert("Cookies are enabled");
}else{
	alert("Cookies disabled");
} */


//redirects users dependent on their language
const userLanguage = navigator.language;
if (userLanguage.startsWith("fr")) {
    // Redirect users with French language preference to the French version of the website
    window.location.href = "french.html";
} else if (userLanguage.startsWith("es")) {
    // Redirect users with Spanish language preference to the Spanish version of the website
    window.location.href = "https://example.com/es";
}

//redirects those who use the Internet explorer browser to a page which tells them to user a better browser
const userAgent = navigator.userAgent;
if (userAgent.includes("MSIE")) {
    // Redirect users with Internet Explorer to a different page
    window.location.href = "https://example.com/upgrade-browser";
}
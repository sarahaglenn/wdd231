const today = new Date();
const year = document.querySelector("#currentyear");
const modified = document.querySelector("#lastModified");

year.innerHTML = today.getFullYear();
modified.innerHTML = `Last modified: ${new Intl.DateTimeFormat("en-UK",{dateStyle: "short"}).format(today)}`;

const hamButton = document.querySelector('#hamButton');
const navLinks = document.querySelector('#animate');

hamButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamButton.classList.toggle('open');
});

const visitMsg = document.querySelector('#visits p');
const msToDays = 86400000;
if (localStorage.lastVisit) {
    const currentDate = Date.now();
    let lastVisit = localStorage.lastVisit;
    const numDays = (currentDate - lastVisit) / msToDays;
    if ( numDays < 1) {
        visitMsg.innerHTML = "Back so soon? Awesome!"
    } else if (numDays.toFixed(0) == 1) {
        visitMsg.innerHTML = `You last visited 1 day ago.`
    } else {
        visitMsg.innerHTML = `You last visited ${numDays.toFixed(0)} days ago.`
    }
} else {
    visitMsg.innerHTML = "Welcome! Let us know if you have any questions."
}
localStorage.setItem("lastVisit", Date.now());

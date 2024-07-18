import { today, year, modified, apiFetch} from "../modules/datesandweather.js";

year.innerHTML = today.getFullYear();
modified.innerHTML = `Last modified: ${new Intl.DateTimeFormat("en-US",{dateStyle: "short"}).format(today)}`;

const hamButton = document.querySelector('#hamButton');
const navLinks = document.querySelector('#animate');

hamButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamButton.classList.toggle('open');
});

// Weather Info
const locationInput = document.querySelector('#locationInput');
const searchButton = document.querySelector('#searchButton');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        apiFetch(location);
    }
});


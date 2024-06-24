const temp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const figcaption = document.querySelector('figcaption');

const lat = "49.75";
const long = "6.64";
const key = "2026cc9883490e04a8412142d4da0c5d";
const url = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${key}`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    }
    catch(error) {
        console.log(error);
    }
}


function displayResults(data) {
    temp.textContent = `${data.main.temp}°C`;
    const iconSRC = `//openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let alt = data.weather[0].description;
    weatherIcon.setAttribute('src', iconSRC);
    weatherIcon.setAttribute('alt', alt);
    figcaption.textContent = `${alt}`;
}
apiFetch()
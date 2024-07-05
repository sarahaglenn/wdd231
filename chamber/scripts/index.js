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

const joinButton = document.querySelector('.hero button');
joinButton.addEventListener('click', () => {
    window.open("join.html");
})


// Weather Info
const currentWeather = document.querySelector('.weatherStats');
const forecast = document.querySelector(".forecast");

const lat = "64.75";
const long = "20.95";
const key = "2026cc9883490e04a8412142d4da0c5d";
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${key}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=${key}`;

async function apiFetch(url, displayFunction) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            // console.log(data);
            displayFunction(data);
        } else {
            throw Error(await response.text());
        }
    }
    catch(error) {
        console.log(error);
    }
}

// function msToTimeString(ms) {
//     let date = new Date(ms);
//     let hours = date.getHours();
//     let minutes = date.getMinutes();
//     return `${hours}:${minutes}`;
// }


function displayCurrentWeather(data) {
    const temp = document.createElement('p');
    const description = document.createElement('p');
    const highandlow = document.createElement('p');
    // const low = document.createElement('p');
    // const sunrise = document.createElement('p');
    // const sunset = document.createElement('p');
    
    temp.innerHTML = `Temp: <strong>${Math.round(data.main.temp)}°C</strong>`;
    const iconSRC = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let alt = data.weather[0].description;
    const weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('src', iconSRC);
    weatherIcon.setAttribute('alt', alt);
    weatherIcon.setAttribute('width', "100");
    weatherIcon.setAttribute('height', "100");
    weatherIcon.setAttribute('id', "weatherIcon");
    description.textContent = `${alt}`;
    description.setAttribute('id', 'desc');
    temp.setAttribute('id', 'temp');
    highandlow.innerHTML = `High: <strong>${Math.round(data.main.temp_max)}°C</strong> Low: <strong>${Math.round(data.main.temp_min)}°C</strong>`;
    // low.innerHTML = `Low: <strong>${Math.round(data.main.temp_min)}°C</strong>`;
    currentWeather.appendChild(temp);
    currentWeather.appendChild(description);
    currentWeather.appendChild(weatherIcon);
    currentWeather.appendChild(highandlow);
    // currentWeather.appendChild(low);
}

function displayForecast(data)  {
    const todayTemp = document.createElement('p');
    const tomorrowTemp = document.createElement('p');
    const nextTemp = document.createElement('p');
    todayTemp.innerHTML = `Today: <strong>${Math.round(data.list[0].main.temp)}°C</strong>`;
    const tomorrow = new Date(data.list[8].dt_txt);
    const nextDay = new Date(data.list[16].dt_txt);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    tomorrowTemp.innerHTML = `${days[tomorrow.getDay()]}: <strong>${Math.round(data.list[8].main.temp)}°C</strong>`;
    nextTemp.innerHTML = `${days[nextDay.getDay()]}: <strong>${Math.round(data.list[16].main.temp)}°C</strong>`;
    forecast.appendChild(todayTemp);
    forecast.appendChild(tomorrowTemp);
    forecast.appendChild(nextTemp);
}
apiFetch(weatherURL, displayCurrentWeather);
apiFetch(forecastURL, displayForecast);

const cards = document.querySelector('#spotlight');
const filename = 'data/members.json';

async function getMemberData() {
    const response = await fetch(filename);
    if (response.ok) {
        const data = await response.json()
        // console.table(data.members);
        displaySpotlights(data.members);
    }
}

const displaySpotlights = (members) => {
    const spotlights = members.filter((member) => member.membership === 3 || member.membership === 2);
    const randomSpotlights = shuffleArray(spotlights);
    displayMembers(randomSpotlights.slice(0,2));
    }

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

const displayMembers = (members) => {
    members.forEach((member) => {
            let logo = document.createElement('a');
            logo.setAttribute('href', member.url);
            logo.innerHTML = `<img src=${member.logo} alt="logo for ${member.businessName}" height="120" loading="lazy">`;
            cards.appendChild(logo);   
        });
}
getMemberData();
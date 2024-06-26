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


// Weather Info
const currentWeather = document.querySelector('.weatherStats');
const weatherIcon = document.getElementById('weatherIcon');
const forecast = document.querySelector(".forecast");

const lat = "64.75";
const long = "20.95";
const key = "2026cc9883490e04a8412142d4da0c5d";
const weatherURL = `//api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${key}`;
const forecastURL = `//api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=${key}`;

async function apiFetch(url, displayFunction) {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
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
//     let date = Date(ms);
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
    const iconSRC = `//openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let alt = data.weather[0].description;
    weatherIcon.setAttribute('src', iconSRC);
    weatherIcon.setAttribute('alt', alt);
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
    console.log((tomorrow.getDay()));
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    tomorrowTemp.innerHTML = `${days[tomorrow.getDay()]}: <strong>${Math.round(data.list[8].main.temp)}°C</strong>`;
    nextTemp.innerHTML = `${days[nextDay.getDay()]}: <strong>${Math.round(data.list[16].main.temp)}°C</strong>`;
    forecast.appendChild(todayTemp);
    forecast.appendChild(tomorrowTemp);
    forecast.appendChild(nextTemp);
}
apiFetch(weatherURL, displayCurrentWeather);
apiFetch(forecastURL, displayForecast);

const cards = document.querySelector('#cards');
const filename = 'data/members.json';

async function getMemberData() {
    const response = await fetch(filename);
    if (response.ok) {
        const data = await response.json()
        // console.table(data.members);
        displayMembers(data.members);
    }
}
getMemberData();

const displayMembers = (members) => {
    members.forEach((member) => {
        if (member.membership === 3) {
            let card = document.createElement('section');
            let name = document.createElement('h3');
            let logo = document.createElement('img');
            let address = document.createElement('p');
            let phone= document.createElement('p');
            let website = document.createElement('a');
            name.textContent = `${member.businessName}`;
            address.innerHTML = `${member.streetAddress} <br> ${member.city}, ${member.country}`;
            phone.textContent = `${member.phone}`;
            website.href = `${member.url}`;
            website.innerHTML = `${member.url}`;
            logo.setAttribute('src', member.logo);
            logo.setAttribute('alt', `Logo for ${member.businessName}`);
            logo.setAttribute('loading', 'lazy');
            logo.setAttribute('height', '100');
            card.appendChild(logo);
            card.appendChild(name);
            card.appendChild(website);
            cards.appendChild(card);
        }
    });
}
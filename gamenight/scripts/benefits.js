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
const locationInput = document.querySelector('#locationInput');
const searchButton = document.querySelector('#searchButton');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        apiFetch(location);
    }
});


async function apiFetch(location) {
    const key = "2026cc9883490e04a8412142d4da0c5d";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${key}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw Error(await response.text());
        }
    }
    catch(error) {
        console.log(error);
    }
}




function displayCurrentWeather(data) {
    currentWeather.innerHTML = "";
    const temp = document.createElement('p');
    const description = document.createElement('p');
    const highandlow = document.createElement('p');
    
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

const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
// cards div
const cards = document.querySelector('#cards');
// buttons
const all = document.querySelector('#all');
const idaho = document.querySelector('#idaho');
const nonus = document.querySelector('#nonus');
const service15 = document.querySelector('#service15');
const child4 = document.querySelector('#child4');
const child10 = document.querySelector('#child10');
const old = document.querySelector('#old');

const filterProphets = async (filter = "all") => {
    let prophets = await getProphetData(url);
        // console.table(data.prophets);
        switch (filter) {
            case "idaho":
                prophets = prophets.filter((prophet) => prophet.birthplace === "Idaho");
                break;
            case "nonus":
                prophets = prophets.filter((prophet) => prophet.birthplace === "England");
                break;
            case "service15":
                prophets = prophets.filter((prophet) => prophet.length >= 15);
                break;
            case "child4":
                prophets = prophets.filter((prophet) => prophet.numofchildren <= 4);
                break;
            case "child10":
                prophets = prophets.filter((prophet) => prophet.numofchildren >= 10);
                break;
            case "old":
                prophets = prophets.filter((prophet) => getAgeInYears(prophet.birthdate, prophet.death) >= 95);
                break;
            default:
                break;
        }
        displayProphets(prophets);
};
async function getProphetData(url) {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        return data.prophets;
    }
}

const displayProphets = (prophets) => {
    cards.innerHTML = "";
    prophets.forEach((prophet) => {
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let birthday = document.createElement('p');
        let place = document.createElement('p');
        let portrait = document.createElement('img');
        fullName.innerHTML = `${prophet.name} ${prophet.lastname}`;
        birthday.innerHTML = `<strong>Date of Birth:</strong> ${prophet.birthdate}`;
        place.innerHTML = `<strong>Place of Birth:</strong> ${prophet.birthplace}`;
        portrait.setAttribute('src', prophet.imageurl);
        let ordinalNum;
        if (prophet.order % 10 == 1) {
            ordinalNum = `${prophet.order}st`;
        } else if (prophet.order % 10 == 2) {
            ordinalNum = `${prophet.order}nd`;
        } else if (prophet.order == 3) {
            ordinalNum = `${prophet.order}rd`;
        } else {
            ordinalNum = `${prophet.order}th`;
        }
        portrait.setAttribute('alt',`Portrait of ${prophet.name} ${prophet.lastname} - ${ordinalNum} Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', 300);
        portrait.setAttribute('height', 400);
        card.appendChild(fullName);
        card.appendChild(birthday);
        card.appendChild(place);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
}

filterProphets();

function getAgeInYears(birthdate, deathdate) {
    let birth = new Date(birthdate);
    let death = new Date(deathdate);
    if (deathdate === null) {
        death = new Date()
    }
    return Math.floor((death - birth) / (365 * 24 * 60 * 60 * 1000));
}

// button listeners
all.addEventListener('click', () => {
    clearClassesOnButtons();
    filterProphets("all");
    all.classList.add("active");
});

idaho.addEventListener('click', () => {
    clearClassesOnButtons();
    filterProphets("idaho");
    idaho.classList.add("active");
});

nonus.addEventListener('click', () => {
    clearClassesOnButtons();
    filterProphets("nonus");
    nonus.classList.add("active");
});

service15.addEventListener('click', () => {
    clearClassesOnButtons();
    filterProphets("service15");
    service15.classList.add("active");
});

child4.addEventListener('click', () => {
    clearClassesOnButtons();
    filterProphets("child4");
    child4.classList.add("active");
});

child10.addEventListener('click', () => {
    clearClassesOnButtons();
    filterProphets("child10");
    child10.classList.add("active");
});

old.addEventListener('click', () => {
    clearClassesOnButtons();
    filterProphets("old");
    old.classList.add("active");
});

function clearClassesOnButtons() {
    buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.className='');
}

filterProphets(url);
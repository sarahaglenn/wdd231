import {year, today, modified} from "../modules/datesandweather.js";

year.innerHTML = today.getFullYear();
modified.innerHTML = `Last modified: ${new Intl.DateTimeFormat("en-US",{dateStyle: "short"}).format(today)}`;

const hamButton = document.querySelector('#hamButton');
const navLinks = document.querySelector('#animate');

hamButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamButton.classList.toggle('open');
});

const favs = document.querySelector(".favGames");
const filename = 'data/games.json';


const dialogBox = document.querySelector('#favDialog');
const title = document.querySelector('#favDialog h2');
const goal = document.querySelector('#goal');
const closeButton = document.querySelector('#favDialog button');
const numPlayers = document.querySelector('#numPlayers');

closeButton.addEventListener('click', () => dialogBox.close())

async function getGameData() {
    const response = await fetch(filename);
    if (response.ok) {
        const data = await response.json()
        displayFavorites(sortGames(data.games));
    }
}

const sortGames = (games) => {
    const cardGames = games.filter((game) => game.type === "card");
    const partyGames = games.filter((game) => game.type === "party");
    const outdoorGames = games.filter((game) => game.type === "outdoor");
    const favGames = [shuffleArray(cardGames)[1], shuffleArray(partyGames)[1], shuffleArray(outdoorGames)[1]];
    return favGames;
}
const displayFavorites = (games) => {
    games.forEach((game) => {
        let figure = document.createElement('figure');
        figure.innerHTML = `
        <figure>
            <img src="${game.image}" alt="Picture of ${game.name}" width="200" height="200" loading="lazy">
            <figcaption>${game.name}</figcaption>
        </figure>`;
        figure.addEventListener('click', () => showStuff(game));
        favs.appendChild(figure);
    });
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
function showStuff(game) {
    title.innerHTML = game.name;
    goal.innerHTML = `<strong>Goal: </strong> ${game.goal}`;
    if (game.minPlayers === game.maxPlayers) {
        numPlayers.innerHTML = `<strong>Players: </strong> ${game.minPlayers}`;
    } else {
        numPlayers.innerHTML = `<strong>Players: </strong> ${game.minPlayers} - ${game.maxPlayers}`;
    }
    dialogBox.showModal();
    dialogBox.addEventListener('click', dismiss);
}

const dismiss = ({target:dialogBox}) => {
    if (dialogBox.nodeName === 'DIALOG')
        dialogBox.close('dismiss')
}

getGameData(filename);

// NEWSLETTER BUTTON AND DIALOG BOX //
const signupButton = document.querySelector(".signup");

signupButton.addEventListener('click', () => {
    signupBox.showModal();
    signupBox.addEventListener('click', dismiss);
});

const submitButton = document.getElementById("submitBtn");
const signupBox = document.querySelector(".newsletter dialog");
const closeBtn = document.querySelector(".newsletter dialog button");
closeBtn.addEventListener('click', () => signupBox.close())

const thanks = document.querySelector("#thanksMsg");
if (thanks) {
    thanks.innerHTML = `${localStorage.fname}, thank you for subscribing to the Game Night Newsletter!`;
}
// TIMESTAMP //
const timestamp = document.querySelector('#timestamp');
if (timestamp) {
    timestamp.value = Date.now();
}
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

const favs = document.querySelector(".favGames");
const filename = 'data/games.json';

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
getGameData(filename);

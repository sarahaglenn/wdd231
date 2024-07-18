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

// DIRECTORY //

const cards = document.querySelector('#cards');
const filename = 'data/games.json';

async function getGameData() {
    const response = await fetch(filename);
    if (response.ok) {
        const data = await response.json()
        displayGames(data.games);
    }
}
getGameData();

const displayGames = (games) => {
    games.forEach((game) => {
        let card = document.createElement('section');
        let suite1 = document.createElement('p');
        suite1.setAttribute('id', 'top-left');
        let suite2 = document.createElement('p');
        suite2.setAttribute('id', 'bottom-right');
        let name = document.createElement('h3');
        let pic = document.createElement('img');
        let goal = document.createElement('p');
        let numPlayers = document.createElement('p');
        let ages = document.createElement('p');
        const suites = ["♥️","♠️","♦️","♣️"];
        suite1.textContent = suites[Math.floor(Math.random() * suites.length)];
        suite2.textContent = suite1.textContent;
        name.textContent = `${game.name}`;
        goal.textContent = `${game.goal}`;
        if (game.minPlayers != game.maxPlayers) {
            numPlayers.textContent = `${game.minPlayers} - ${game.maxPlayers} players`
        } else {
            numPlayers.textContent = `${game.minPlayers} players`;
        }
        numPlayers.setAttribute('id', 'numPlayers');
        ages.textContent = game.ages.join(', ');
        ages.setAttribute('id', 'ages');
        pic.setAttribute('src', game.image);
        pic.setAttribute('alt', `Picture of ${game.name}`);
        pic.setAttribute('loading', 'lazy');
        pic.setAttribute('height', '100');
        pic.setAttribute('width', '100');
        card.appendChild(suite1);
        card.appendChild(name);
        card.appendChild(pic);
        card.appendChild(goal);
        card.appendChild(numPlayers);
        card.appendChild(ages);
        card.appendChild(suite2);
        cards.appendChild(card);
    });
}
// toggle between grid and list view
const viewButton = document.querySelector('#view');

viewButton.addEventListener('click', () => {
    if (cards.classList.contains("list")) {
        cards.classList.remove("list");
        viewButton.innerHTML = `&#9776`;
    }
    else {
        cards.classList.add("list");
        viewButton.innerHTML = `&#5010&#5010&#5010`;
    }
});

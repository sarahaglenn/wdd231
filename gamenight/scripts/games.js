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
        return data.games;
    }
}

const displayGames = (games) => {
    cards.innerHTML = "";
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

// FILTERING GAMES //

// buttons
const all = document.querySelector('#all');
const card = document.querySelector('#card');
const outdoor = document.querySelector('#outdoor');
const party = document.querySelector('#party');
const group = document.querySelector('#lgGroup');
const young = document.querySelector('#young');

// MATCHING FILTER //
const filterGames = async (filter = "all") => {
    let games = await getGameData(filename);
        switch (filter) {
            case "card":
                games = games.filter((game) => game.type === "card");
                break;
            case "outdoor":
                games = games.filter((game) => game.type === "outdoor");
                break;
            case "party":
                games = games.filter((game) => game.type === "party");
                break;
            case "group":
                games = games.filter((game) => game.maxPlayers === "many" || game.maxPlayers >= 10);
                break;
            case "young":
                games = games.filter((game) => game.ages[0] === "under 6");
                break;
            default:
                break;
        }
        displayGames(games);
};


// button listeners
all.addEventListener('click', () => {
    clearClassesOnButtons();
    filterGames("all");
    all.classList.add("active");
});

card.addEventListener('click', () => {
    clearClassesOnButtons();
    filterGames("card");
    card.classList.add("active");
});

outdoor.addEventListener('click', () => {
    clearClassesOnButtons();
    filterGames("outdoor");
    outdoor.classList.add("active");
});

party.addEventListener('click', () => {
    clearClassesOnButtons();
    filterGames("party");
    party.classList.add("active");
});

group.addEventListener('click', () => {
    clearClassesOnButtons();
    filterGames("group");
    group.classList.add("active");
});

young.addEventListener('click', () => {
    clearClassesOnButtons();
    filterGames("young");
    young.classList.add("active");
});


function clearClassesOnButtons() {
    buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.className='');
}

filterGames(filename);

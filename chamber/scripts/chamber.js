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

// filling business cards
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
        let card = document.createElement('section');
        let name = document.createElement('p');
        let logo = document.createElement('img');
        let address = document.createElement('p');
        let phone= document.createElement('p');
        let website = document.createElement('p');
        name.textContent = `${member.businessName}`;
        address.innerHTML = `${member.streetAddress} <br> ${member.city}, ${member.country}`;
        phone.textContent = `${member.phone}`;
        website.textContent = `${member.url}`;
        logo.setAttribute('src', member.logo);
        logo.setAttribute('alt', `Logo for ${member.businessName}.`);
        logo.setAttribute('loading', 'lazy');
        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        cards.appendChild(card);
    });
}
// toggle between grid and list view
const viewButton = document.querySelector('#view');
// const listButton = document.querySelector('#list');

viewButton.addEventListener('click', () => {
    if (cards.classList.contains("list")) {
        cards.classList.remove("list");
        viewButton.textContent = `📋List View`;
    }
    else {
        cards.classList.add("list");
        viewButton.textContent = `🔳Grid View`;
    }
});
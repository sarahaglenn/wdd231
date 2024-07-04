// FOOTER DATES //
const today = new Date();
const year = document.querySelector("#currentyear");
const modified = document.querySelector("#lastModified");

year.innerHTML = today.getFullYear();
modified.innerHTML = `Last modified: ${new Intl.DateTimeFormat("en-UK",{dateStyle: "short"}).format(today)}`;

// MENU ANIMATION AND EVENT LISTENERS //
const hamButton = document.querySelector('#hamButton');
const navLinks = document.querySelector('#animate');

hamButton.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamButton.classList.toggle('open');
});

// MEMBERSHIP LEVEL MODALS //

import {membershipLevels} from "../data/membership.js";

const options = document.querySelector('#memberOptions');
const dialogBox = document.querySelector('#dialog');
const title = document.querySelector('#dialog h3');
const closeButton = document.querySelector('#dialog button');
const benefits = document.querySelector('#dialog ul');
const price = document.querySelector('#price');


function displayMemberships(data) {
    data.forEach(x => {    
    const membershipLabel = document.createElement('label');
    membershipLabel.innerHTML = `<input type="radio" name="membership" required title="${x.level}" value="${x.level}"> ${x.level} <span id="${x.id}"><sup>&#9432;</sup></span>`;
    options.appendChild(membershipLabel);
    const infoIcon = document.getElementById(`${x.id}`);
    infoIcon.addEventListener('click', () =>
        showDetails(x)); 
    }) 
    closeButton.addEventListener('click', () => dialogBox.close());       
}

function showDetails(x) {
    title.innerHTML = `${x.level}`;
    benefits.innerHTML = "";
    x.benefits.forEach(b => {
        const benefit = document.createElement('li');
        benefit.innerHTML = b;
        benefits.appendChild(benefit);
    })
    price.innerHTML = `<strong>Price: </strong>${x.price}`;
    dialogBox.showModal();
    dialogBox.addEventListener('click', dismiss);
}
displayMemberships(membershipLevels);

const dismiss = ({target:dialogBox}) => {
    if (dialogBox.nodeName === 'DIALOG')
        dialogBox.close('dismiss')
}

// TIMESTAMP //
const timestamp = document.querySelector('#timestamp');
timestamp.value = Date.now();

import {temples} from "../data/temples.js";

import {url} from "../data/temples.js";

const showHere = document.querySelector('#showHere');
const dialogBox = document.querySelector('#mydialog');
const title = document.querySelector('#mydialog h2');
const closeButton = document.querySelector('#mydialog button');
const templeInfo = document.querySelector('#mydialog p');

closeButton.addEventListener('click', () => dialogBox.close())

function displayItems(data) {
    data.forEach(x => {
        console.log(x)
        const photo = document.createElement('img');
        photo.src=`${url}${x.path}`;
        photo.alt=x.name
        photo.addEventListener('click', () => showStuff(x));
        showHere.appendChild(photo);
    })
}

displayItems(temples);

function showStuff(x) {
    title.innerHTML = x.name;
    templeInfo.innerHTML = `Dedicated ${x.dedicated} by ${x.person} as temple number ${x.number}.`;
    dialogBox.showModal();
}
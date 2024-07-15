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

// FORM SUBMISSION DETAILS //
const currentURL = window.location.href;
const allData = currentURL.split('?');
let formData = allData[1].split('&');

function display(field) {
    let result = '';
    formData.forEach ((item) => {
        if (item.startsWith(field)) {
            result = item.split('=')[1].replace('%40','@').replace('%27','\'').replace('+',' ');
        }
    })
    if (field === 'timestamp') {
        const dateObj = new Date(parseInt(result));
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const hours = dateObj.getHours() % 12;
        let minutes = dateObj.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (dateObj.getHours() > 12) {
            minutes = minutes + 'pm';
        } else {
            minutes = minutes + 'am'
        }
        result = `${year}/${month}/${day} at ${hours}:${minutes}`
    }
    return result
}

const results = document.querySelector('#results');
results.innerHTML = `
<p>${display('first')} ${display('last')}, we are excited you've joined us!</p>
<br>
<h4>Confirmation of Details:</h4>
<p>Your Phone: ${display('phone')}</p>
<p>Your Email: <a href=mailto:"${display('email')}">${display('email')}</a></p>
<br>
<p>Organization Name: ${display('busName')}</p>
<p>Membership Level: ${display('membership')}</p>
<br>
<p>${display('timestamp')}<p/>`;
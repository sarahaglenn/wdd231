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

// get data
// for each membership level create a dialog element
// fill the inner html
// select the icon
// add an even listener for that item



// const goldInfo = document.querySelector('.goldInfo');
// goldInfo.innerHTML = `
//     <div>
//     <h4>Gold Membership Level</h4>
//     <button class="closeButton">❌</button>
//     <p><strong>Member Benefits:</strong></p>
//     <ul>
//         <li>Access to over 30 networking events</li>
//         <li>Access to over 30 networking events</li>
//         <li>Access to over 30 networking events</li>
//     </ul>
//     <p><strong>Price: </strong>$500</p>
//     </div>`;

// const goldInfoIcon = document.querySelector('#goldInfo');
// goldInfoIcon.addEventListener('click', () => {
//     goldInfo.showModal();
// })
// const dismiss = ({target:courseDetails}) => {
//     if (courseDetails.nodeName === 'DIALOG')
//         courseDetails.close('dismiss')
// }
// goldInfo.addEventListener('click', dismiss);

// document.querySelector('.closeButton').addEventListener('click', () => {
//     goldInfo.close();
// });

const filename = 'data/members.json';

async function getMembershipData() {
    const response = await fetch(filename);
    if (response.ok) {
        const data = await response.json()
        generateMembershipInfo(data.membership);
    }
}
getMembershipData();

const generateMembershipInfo = (info) => {
    info.forEach ((level) => {
        const infoModal = document.createElement('dialog');
        infoModal.innerHTML = `
        <div>
        <h4>${level.level} Level</h4>
        <button class="closeButton">❌</button>
        <p><strong>Member Benefits:</strong></p>
        <ul class = "${level.id}">
        </ul>
        <p><strong>Price: </strong>${level.price}</p>
        </div>`;
        infoModal.setAttribute('id', level.id);

        document.querySelector('form').appendChild(infoModal);

        let benefitsList = document.querySelector(`.${level.id}`);
        // level.benefits.forEach ((b) => {
        //     let listItem = document.createElement('li');
        //     listItem.innerHTML = "";
        //     listItem.innerHTML = b;
        //     benefitsList.appendChild(listItem);
        // });
    });
}
// const displaySpotlights = (members) => {
//     const spotlights = members.filter((member) => member.membership === 3 || member.membership === 2);
//     const randomSpotlights = shuffleArray(spotlights);
//     displayMembers(randomSpotlights.slice(0,2));
//     }

// const shuffleArray = array => {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         const temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
//     return array;
// }

// const displayMembers = (members) => {
//     members.forEach((member) => {
//             let logo = document.createElement('a');
//             logo.setAttribute('href', member.url);
//             logo.innerHTML = `<img src=${member.logo} alt="logo for ${member.businessName}" height="120" loading="lazy">`;
//             cards.appendChild(logo);   
//         });
// }
// getMemberData();

// DIALOG BOX
// const courseDetails = document.querySelector('dialog');

// function displayCourseDetails(course) {
//     courseDetails.innerHTML = '';
//     courseDetails.innerHTML = 
//     `<div>
//     <h2>${course.subject} ${course.number}</h2>
//     <button class="closeButton">❌</button>
//     <h3>${course.title}</h3>
//     </div>
//     <p><strong>Credits: </strong>${course.credits}</p>
//     <p><strong>Certificate: </strong>${course.certificate}</p>
//     <p>${course.description}</p>
//     <p><strong>Technologies: </strong>${course.technology.join(', ')}</p>
//     `
//     courseDetails.showModal();
//     courseDetails.addEventListener('click', dismiss);

//     document.querySelector('.closeButton').addEventListener('click', () => {
//         courseDetails.close();
//     });
// }


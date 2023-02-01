// configure footer
let currentYear = new Date().getFullYear();
const copyright = document.createElement('p');
copyright.textContent = `\u00A9 ${currentYear} Aleksey Kabishau`;

const footer = document.querySelector('footer');
footer.appendChild(copyright);


// add bullets to the skills section of the page
const mySkills = ['Skill 1', 'Skill 2', 'Skill 3', 'Skill 4'];
const skillsList = document.querySelector('#skills').querySelector('ul');

for (skill of mySkills) {
    const skillBullet = document.createElement('li');
    skillBullet.textContent = skill;
    skillsList.appendChild(skillBullet);
}


// // handle message form submit
// const messageForm = document.getElementsByName('leave_message')[0];
// messageForm.addEventListener('submit', (event) => {
//     event.preventDefault(); // in this case prevents refreshing page after submit clicked

//     // create remove button
//     const removeButton = document.createElement('button');
//     removeButton.textContent = "remove";
//     removeButton.type = "button";Í
//     removeButton.addEventListener('click', (event) => {
//         event.target.parentNode.remove();
//     });

//     // capture form values and create new bullet with values from the form
//     const name = event.target.name;
//     const email = event.target.email;
//     const message = event.target.message;

//     const newMessage = document.createElement('li');
//     newMessage.insertAdjacentHTML(
//         'afterbegin',
//         `<a href="mailto:${email.valuÍe}">${name.value}</a> wrote <span>${message.value} </span>`
//     );
//     newMessage.append(removeButton);

    
//     const messageList = document.getElementById('messages').querySelector('ul');
//     messageList.appendChild(newMessage);

//     event.target.reset();
// });

// GitHub repositories using Fetch API 

function renderHTMLfor(projects) {
    const projectSection = document.getElementById('projects');
    const projectList = projectSection.querySelector('ul');
    for (project of projects) {
        const projectBullet = document.createElement('li');
        const projectUrl = document.createElement('a');
        projectUrl.textContent = project.name;
        projectUrl.href = project.html_url;
        projectUrl.target = '_blank'
        projectBullet.appendChild(projectUrl);
        projectList.appendChild(projectBullet);
    }
}

fetch('https://api.github.com/users/akabishau/repos')
.then(response => response.json())
.then(projects => renderHTMLfor(projects))
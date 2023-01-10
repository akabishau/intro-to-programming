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


// handle message form submit
const messageForm = document.getElementsByName('leave_message')[0];
messageForm.addEventListener('submit', (event) => {
    event.preventDefault(); // in this case prevents refreshing page after submit clicked

    // create remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = "remove";
    removeButton.type = "button";
    removeButton.addEventListener('click', (event) => {
        event.target.parentNode.remove();
    });

    // capture form values and create new bullet with values from the form
    const name = event.target.name;
    const email = event.target.email;
    const message = event.target.message;

    const newMessage = document.createElement('li');
    newMessage.insertAdjacentHTML(
        'afterbegin',
        `<a href="mailto:${email.value}">${name.value}</a> wrote <span>${message.value} </span>`
    );
    newMessage.append(removeButton);

    
    const messageList = document.getElementById('messages').querySelector('ul');
    messageList.appendChild(newMessage);

    event.target.reset();
});

// GitHub repositories XML HTTP request
var githubProjects = [];
const githubRequest = new XMLHttpRequest();
githubRequest.addEventListener('load', function() {
    githubProjects = JSON.parse(githubRequest.response);
    renderHTMLfor(githubProjects);
});
githubRequest.open('GET', 'https://api.github.com/users/akabishau/repos');
githubRequest.send();


function renderHTMLfor(projects) {
    const projectSection = document.getElementById('projects');
    const projectList = projectSection.querySelector('ul');
    
    for (project of githubProjects) {
        const projectBullet = document.createElement('li');
        projectBullet.textContent = project.name;
        projectList.appendChild(projectBullet);
    }
}
const mySkills = ['HTML', 'CSS', 'Javascript', 'Node.js', 'Agile', 'SDLC', 'Swift', 'SQL', 'Python', 'Jira'];
let messageCount = 0;
let currentYear = new Date().getFullYear();
const myName = 'Aliaksei Kabishau';


const skillsList = document.getElementById('skills-list');
const projectList = document.getElementById('project-list');
const messagesSection = document.getElementById('messages');
const messageList = messagesSection.querySelector('ul');
const messageForm = document.getElementById('feedback-form');
const footerCopyright = document.querySelector('.copyright');


function createSkillsList(skills) {
    for (item of skills) {
        const skill = document.createElement('div');
        skill.className = 'skills-item';
        skill.textContent = item;
        skillsList.appendChild(skill);
    }
}


messageForm.addEventListener('submit', (event) => {
    event.preventDefault(); // in this case prevents refreshing page after submit clicked

    // capture form values and create new bullet with values from the form
    const name = event.target.name.value;
    const email = event.target.email.value;
    const messageText = event.target.message.value;

    const newMessage = createMessage(name, email, messageText);
    addMessage(newMessage);

    event.target.reset();
});


function addMessage(message) {
    messageList.appendChild(message);

    if (messageCount == 0) {
        messagesSection.className = 'messages-show'
    }
    messageCount += 1;
}


function createMessage(name, email, messageText) {
    const li = document.createElement('li');
    li.className = 'message';

    const pFrom = document.createElement('p');
    pFrom.className = 'message-from';

    const a = document.createElement('a');
    a.href = `mailto:${email}`;
    a.text = name;

    const span = document.createElement('span');
    span.textContent = 'Message from:';

    pFrom.appendChild(span);
    pFrom.appendChild(a);
    li.appendChild(pFrom);


    const pText = document.createElement('p');
    pText.className = 'message-text';
    pText.textContent = messageText;
    li.appendChild(pText);


    // create edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'edit';
    editButton.type = 'button';
    editButton.className = 'edit-message'
    li.appendChild(editButton);

    // create remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    removeButton.type = 'button';
    removeButton.className = 'remove-message'
    li.appendChild(removeButton);

    removeButton.addEventListener('click', (event) => {
        removeMessage(event.target.parentNode);
    });

    editButton.addEventListener('click', (event) => {
        console.log(event.target.parentNode);
    })

    return li
}

function addMessage(message) {
    messageList.appendChild(message);

    if (messageCount == 0) {
        messagesSection.className = 'messages-show'
    }
    messageCount += 1;
}


function removeMessage(message) {
    message.remove()
    messageCount -= 1;
    if (messageCount == 0) {
        messagesSection.className = 'messages-hide'
    }
}



function configureFooter(year, name) {
    const p = document.createElement('p');
    p.textContent = `\u00A9 ${year} ${name}`;
    footerCopyright.appendChild(p);
}


createSkillsList(mySkills);
configureFooter(currentYear, myName);

const message1 = createMessage('Kale', 'email@email.com', 'Good job! Keep going!');
const message2 = createMessage('Jane', 'email@email.com', 'If you want to work on improving the overall design, please let me know. I\'m free next week 😀');
addMessage(message1);
addMessage(message2);




// FETCH //
const getReposUrl = 'https://api.github.com/users/akabishau/repos';
const getUserUrl = 'https://api.github.com/users/akabishau';


fetch(getReposUrl)
.then(response => response.json())
.then(json => getLanguages(json))
.then(projects => renderProjects(projects))
.catch(error => console.log('Error getting project data from GitHub: ', error))


//  HELPER FUNCTIONS //
function getLanguages(json) {
    const projects = json.map ( repo => {
        return fetch(repo.languages_url)
        .then(response => response.json())
        .then(json => {
            const languages = parseProjectLanguages(json);
            repo.languages = languages;
            return repo;
        } )
        .catch(error => print('Error fetching languages:', error))
    })
    return Promise.all(projects);
}


function parseProjectLanguages(data) {
    let languages = []
    for (const[key, value] of Object.entries(data)) {
        let languageInfo = {
            name: key,
            volume: value
        }
        languages.push(languageInfo);
    }
    return languages
}


function renderProjects(projects) {
    projects.forEach( project => {
        const repo = document.createElement('li');
        repo.className = 'project';

        // name and link
        const projectLink = document.createElement('a');
        projectLink.href = project.url;
        projectLink.text = project.name;
        projectLink.className = 'project-title';
        projectLink.target = '_blank';
        repo.appendChild(projectLink);

        // description
        const description = document.createElement('p');
        description.textContent = project.description;
        repo.appendChild(description);

        // languages
        const languageList = renderProjectLanguages(project.languages);
        repo.appendChild(languageList);

        projectList.appendChild(repo);
    })
}


function renderProjectLanguages(languages) {
    let totalVolume = 0
    languages.forEach( lang => {
        totalVolume += lang.volume;
    });

    const languageList = document.createElement('ul');
    languageList.className = 'language-list';

    languages.forEach(lang => {
        const langItem = document.createElement('li');
        const name = document.createElement('span');
        name.className = 'language-name';
        name.textContent = lang.name;
        langItem.appendChild(name);
        const percentage = document.createElement('span');
        percentage.className = 'language-volume';
        const value = Math.round(lang.volume / totalVolume * 100);
        percentage.textContent = `${value}%`;
        langItem.appendChild(percentage);
        languageList.appendChild(langItem);
    });
    return languageList;
}
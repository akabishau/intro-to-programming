const mySkills = ['HTML', 'CSS', 'Javascript', 'Node.js', 'Agile', 'SDLC', 'Swift', 'SQL', 'Python', 'Jira'];
let messageCount = 0;
let currentYear = new Date().getFullYear();

const defaultName = 'Aleksey K';
const defaultBio = 'Aspiring Full Stack Developer';
const githubProfileUrl = 'https://github.com/akabishau';
const getReposUrl = 'https://api.github.com/users/akabishau/repos';
const getUserInfoUrl = 'https://api.github.com/users/akabishau';


const skillsList = document.getElementById('skills-list');
const projectList = document.getElementById('project-list');
const messagesSection = document.getElementById('messages');
const messageList = messagesSection.querySelector('ul');
const messageForm = document.getElementById('feedback-form');
const footerCopyright = document.querySelector('.copyright');


// SKILLS
function createSkillsList(skills) {
    for (item of skills) {
        const skill = document.createElement('div');
        skill.className = 'skills-item card';
        skill.textContent = item;
        skillsList.appendChild(skill);
    }
}


// MESSAGES

messageForm.addEventListener('submit', (event) => {
    event.preventDefault(); // in this case prevents refreshing page after submit clicked

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
        messagesSection.className = 'messages-show';
    }
    messageCount += 1;
}


function createMessage(name, email, messageText) {
    const li = document.createElement('li');
    li.className = 'message card';

    const pFrom = document.createElement('p');
    pFrom.className = 'message-from';

    const a = document.createElement('a');
    a.className = 'project-link';
    a.href = `mailto:${email}`;
    a.text = name;

    const span = document.createElement('span');
    span.textContent = 'Message from:';

    pFrom.appendChild(span);
    pFrom.appendChild(a);
    li.appendChild(pFrom);


    const pText = document.createElement('p');
    pText.className = 'message-text';
    pText.textContent = `"${messageText}"`;
    li.appendChild(pText);


    // create remove button
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-message';
    removeButton.textContent = 'remove';
    removeButton.type = 'button';
    li.appendChild(removeButton);

    removeButton.addEventListener('click', (event) => {
        removeMessage(event.target.parentNode);
    });

    return li;
}


function addMessage(message) {
    messageList.appendChild(message);

    if (messageCount == 0) {
        messagesSection.className = 'messages-show';
    }
    messageCount += 1;
}


function removeMessage(message) {
    message.remove();
    messageCount -= 1;
    if (messageCount == 0) {
        messagesSection.className = 'messages-hide';
    }
}


// HELPER UI UPDATE FUNCTIONS
function configureFooter(year, name) {
    const p = document.createElement('p');
    p.textContent = `\u00A9 ${year} ${name}`;
    footerCopyright.appendChild(p);
}


function configureHeader(name, url) {
    const headerNameWrapper = document.querySelector('.name-wrapper');

    const avatar = document.createElement('img');
    avatar.className = 'logo';
    avatar.alt = 'GitHub Avatar';
    avatar.src = url;
    headerNameWrapper.appendChild(avatar);

    const heading = document.createElement('h1');
    heading.textContent = name;
    headerNameWrapper.appendChild(heading);
    
}


function configureTitle(name) {
    const title = document.querySelector('head').querySelector('title');
    title.textContent = name;
}


function configureAbout(bio) {
    const about = document.getElementById('about').querySelector('p');
    about.textContent = bio;
}


// FETCH DATA RELATED HELPER FUNCTIONS //

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}


function getLanguages(json) {
    const projects = json.map ( repo => {
        return fetch(repo.languages_url)
        .then(response => response.json())
        .then(json => {
            const languages = parseProjectLanguages(json);
            repo.languages = languages;
            return repo;
        } )
        .catch(error => print('Error fetching languages:', error));
    });
    return Promise.all(projects);
}


function parseProjectLanguages(data) {
    let languages = [];
    for (const[key, value] of Object.entries(data)) {
        let languageInfo = {
            name: key,
            volume: value
        };
        languages.push(languageInfo);
    }
    return languages;
}


function renderEmptyProjectsMessage() {
    const message = document.createElement('li');
    message.className = 'project-empty card';

    const image = document.createElement('img');
    image.src = 'images/empty-state-github.png';

    message.appendChild(image);

    const text = document.createElement('p');
    text.textContent = 'Something went wrong fetching projects from GitHub...🧐 But you can always check my profile and projects ';
    
    const githubLink = document.createElement('a');
    githubLink.className = 'project-link';
    githubLink.text = 'here';
    githubLink.href = githubProfileUrl;
    githubLink.target = '_blank';
    text.appendChild(githubLink);

    const emoji = document.createElement('span');
    emoji.textContent = ' 👀';
    text.appendChild(emoji);
    
    message.appendChild(text);
    projectList.appendChild(message);
}


function renderProjects(projects) {
    projects.forEach( project => {
        const repo = document.createElement('li');
        repo.className = 'project card';

        // name and link
        const projectLink = document.createElement('a');
        projectLink.href = project.html_url;
        projectLink.text = project.name;
        projectLink.className = 'project-title project-link';
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
    });
}


function renderProjectLanguages(languages) {
    let totalVolume = 0;
    languages.forEach( lang => {
        totalVolume += lang.volume;
    });

    const languageList = document.createElement('ul');
    languageList.className = 'language-list';

    languages.forEach(lang => {
        const langItem = document.createElement('li');
        langItem.className = lang.name.toLowerCase();
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


// ON PAGE LOAD
createSkillsList(mySkills);

// generate message that highlight the page features
const message1 = createMessage('Kate', 'email@email.com', 'Hey, It\'s a good idea to fetch user information (name spelling, bio, photo/avatar) directly from GitHub. Then, you only need to update it in one place, and it will be reflected on the portfolio page! 🤓');
const message2 = createMessage('Rick', 'email@email.com', 'Hi there! ✋ I like that you\'ve created the empty state message for the project section in case of issues with getting data from GitHub API. The default values for the user information are also a good idea, so the page still looks nice no matter what 😀');
const message3 = createMessage('Mike', 'email@email.com', 'I see layout changes depending on screen size for many sections on the page (mobile, tablet, desktop). We need to present the information in the best possible way 👍');
const message4 = createMessage('Michelle', 'email@email.com', 'Interesting idea of calculating and displaying the programming languages for the projects! 👏')
addMessage(message1);
addMessage(message2);
addMessage(message3);
addMessage(message4);


// fetch user info from github or populate default values in case of error
// break url to test
fetch(getUserInfoUrl)
.then(response => checkStatus(response))
.then(response => response.json())
.then(user => {
    configureTitle(user.name);
    configureHeader(user.name, user.avatar_url);
    configureFooter(currentYear, user.name);
    configureAbout(user.bio);
})
.catch(error => {
    console.log('Error getting user data from GitHub', error);
    configureTitle(defaultName);
    configureHeader(defaultName, 'images/logo.png');
    configureFooter(currentYear, defaultName);
    configureAbout(defaultBio);
});


// fetch repositories from github or populate empty state message in case of error
// break url to test
fetch(getReposUrl)
.then(response => response.json())
.then(json => getLanguages(json))
.then(projects => renderProjects(projects))
.catch(error => {
    console.log('Error getting project data from GitHub: ', error);
    renderEmptyProjectsMessage();
});


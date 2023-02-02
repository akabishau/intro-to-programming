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
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
    console.log(event.target);

    const name = event.target.name;
    const email = event.target.email;
    const message = event.target.message;

    console.log(`${name.value} + ${email.value} + ${message.value}`);
    event.target.reset();
});
let messageCount = 0

const messagesSection = document.getElementById('messages');
const messageList = messagesSection.querySelector('ul');
const messageForm  = document.getElementById('feedback');



messageForm.addEventListener('submit', (event) => {
    event.preventDefault(); // in this case prevents refreshing page after submit clicked

    

    // capture form values and create new bullet with values from the form
    const name = event.target.name.value;
    const email = event.target.email.value;
    const messageText = event.target.message.value;

    const newMessage = createMessage(name, email, messageText);

    messageList.appendChild(newMessage);
    
    if (messageCount == 0) {
        messagesSection.className = 'messages-show'
    }
    messageCount += 1;

    event.target.reset();
});



function createMessage(name, email, messageText) {
    const li = document.createElement('li');

    // create "message" line
    const p = document.createElement('p');
    p.textContent = messageText;
    li.appendChild(p);

    // create "from" line
    const a = document.createElement('a');
    a.href = `mailto:${email}`;
    a.text = name;

    const span = document.createElement('span');  
    span.textContent = 'from ';
    span.appendChild(a);
    li.appendChild(span);

    // create remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = "remove";
    removeButton.type = "button";
    
    removeButton.addEventListener('click', (event) => {
        event.target.parentNode.remove();
        messageCount -= 1;
        if (messageCount == 0) {
            messagesSection.className = 'messages-hide'
        }
    });

    li.appendChild(removeButton);
    return li;
  }
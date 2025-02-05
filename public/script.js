const socket = io();
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesContainer = document.getElementById('messages');

// Demander un pseudo si non enregistré
let username = localStorage.getItem('username');
if (!username) {
    username = prompt("Entrez votre pseudo :");
    localStorage.setItem('username', username);
}

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('message', { username, text: message });
        messageInput.value = '';
    }
});

socket.on('message', (data) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.username}: ${data.text}`;
    messagesContainer.appendChild(messageElement);
});

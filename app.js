// Connexion au serveur Socket.io
const socket = io();

// Récupération des éléments du DOM
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesContainer = document.getElementById('messages');

// Envoi du message lors du clic ou de la touche "Enter"
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

function sendMessage() {
  const msg = messageInput.value.trim();
  if (msg !== '') {
    socket.emit('message', msg);
    messageInput.value = '';
  }
}

// Réception des messages du serveur
socket.on('message', (msg) => {
  const p = document.createElement('p');
  p.textContent = msg;
  messagesContainer.appendChild(p);
  // Pour scroller vers le dernier message
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

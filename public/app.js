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

// Vérifier si un nom d'utilisateur est déjà enregistré dans le localStorage
let username = localStorage.getItem('username');
if (!username) {
  // Demander le nom si ce n'est pas défini
  username = prompt("Quel est ton nom ?");
  if (username && username.trim() !== "") {
    localStorage.setItem('username', username.trim());
  } else {
    // Si l'utilisateur annule ou ne fournit rien, on met un nom par défaut
    username = "Inconnu";
    localStorage.setItem('username', username);
  }
}

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
    // On envoie un objet contenant le nom de l'utilisateur et le message
    socket.emit('message', { username, text: msg });
    messageInput.value = '';
  }
}

// Réception des messages du serveur
socket.on('message', (data) => {
  // data est un objet avec data.username et data.text
  const messageBubble = createMessageBubble(data.username, data.text);
  messagesContainer.appendChild(messageBubble);
  // Scroller vers le dernier message
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

function createMessageBubble(sender, text) {
  const bubble = document.createElement('div');
  bubble.classList.add('message-bubble');
  // On peut ajouter une classe spécifique si c'est le message de l'utilisateur actuel
  if (sender === username) {
    bubble.classList.add('own-message');
  }
  
  bubble.innerHTML = `
    <div class="message-sender">${sender}</div>
    <div class="message-text">${text}</div>
  `;
  return bubble;
}

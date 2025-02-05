const socket = io();
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const messagesContainer = document.getElementById('messages');

// Demander un pseudo si non enregistré
let username = localStorage.getItem('username');
if (!username) {
    username = prompt("Entrez votre pseudo :") || "Anonyme";
    localStorage.setItem('username', username);
}

// Envoyer un message
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('message', { username, text: message });
        messageInput.value = '';
    }
});

// Afficher les anciens messages envoyés avant la connexion
socket.on('messageHistory', (messages) => {
    messagesContainer.innerHTML = ''; // Nettoyer avant d'afficher l'historique
    messages.forEach((data) => afficherMessage(data.username, data.text));
});

// Afficher un nouveau message reçu en direct
socket.on('message', (data) => {
    afficherMessage(data.username, data.text);
});

// Fonction pour afficher un message dans le chat
function afficherMessage(username, text) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${username}:</strong> ${text}`;
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Faire défiler vers le bas
}

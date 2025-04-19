const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
//test
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Liste pour stocker les messages
const messages = [];

// Servir les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Nouvel utilisateur connecté');

    // Envoyer l'historique des messages au nouvel utilisateur
    socket.emit('messageHistory', messages);

    socket.on('message', (data) => {
        console.log(`${data.username}: ${data.text}`);

        // Ajouter le message à l'historique
        messages.push(data);

        // Envoyer le message à tout le monde
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s’est déconnecté');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

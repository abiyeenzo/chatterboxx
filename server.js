const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Servir les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('Nouvel utilisateur connecté');

    socket.on('message', (data) => {
        console.log(`${data.username}: ${data.text}`);
        io.emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('Un utilisateur s’est déconnecté');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Serveur en ligne sur le port ${PORT}`));

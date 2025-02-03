const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Sert les fichiers statiques du dossier public
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('Un utilisateur s’est connecté');

  socket.on('message', (data) => {
    // data contient { username, text }
    console.log(`${data.username} : ${data.text}`);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur s’est déconnecté');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

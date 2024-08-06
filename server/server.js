const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json'); // Actualiza la ruta

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-database-name.firebaseio.com"
});

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});

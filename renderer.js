const axios = require('axios');
const io = require('socket.io-client');

document.addEventListener('DOMContentLoaded', () => {
  const socket = io('http://localhost:4000');
  socket.on('connect', () => {
    console.log('Connected to backend');
  });

  // Ejemplo de petición HTTP
  axios.get('http://localhost:4000/api')
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error('Error fetching data', error);
    });
});

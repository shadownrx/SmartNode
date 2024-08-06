// renderer.js
const { auth } = require('./firebase');
const { signInWithEmailAndPassword, onAuthStateChanged } = require('firebase/auth');
const axios = require('axios');
const io = require('socket.io-client');

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const pilotNumberDisplay = document.getElementById('pilot-number');

  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Login exitoso
        const user = userCredential.user;
        // Obtener el número de piloto del Firestore
        getPilotNumber(user.uid);
      })
      .catch((error) => {
        console.error('Error en el login:', error);
      });
  });

  const getPilotNumber = (userId) => {
    axios.get(`http://localhost:4000/api/pilotNumber?userId=${userId}`)
      .then(response => {
        const pilotNumber = response.data.pilotNumber;
        pilotNumberDisplay.textContent = `Número de piloto: ${pilotNumber}`;
      })
      .catch(error => {
        console.error('Error al obtener el número de piloto:', error);
      });
  };

  const socket = io('http://localhost:4000');
  socket.on('connect', () => {
    console.log('Connected to backend');
  });
});

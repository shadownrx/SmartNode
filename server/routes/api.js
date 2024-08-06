// server/routes/api.js
const express = require('express');
const router = express.Router();
const { getFirestore, doc, getDoc } = require('firebase-admin/firestore');

const db = getFirestore();

router.get('/pilotNumber', async (req, res) => {
  const userId = req.query.userId;

  // Verificar si userId está presente en la solicitud
  if (!userId) {
    return res.status(400).send('User ID is required');
  }

  try {
    const userDoc = await getDoc(doc(db, 'users', userId));

    // Verificar si el documento existe
    if (userDoc.exists) {
      const pilotNumber = userDoc.data().pilotNumber;
      res.json({ pilotNumber });
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    console.error('Error getting pilot number:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the ACARS API' });
});

module.exports = router;

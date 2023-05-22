/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// POST: Create a new nickname
exports.createNickname = functions.https.onRequest(async (req, res) => {
  // Get the nickname from the request
  const nickname = req.body.nickname;
  
  // Check if the nickname already exists
  const snapshot = await db.collection('nicknames').where('nickname', '==', nickname).get();
  
  if (!snapshot.empty) {
    // Nickname already exists
    res.status(400).send('Nickname already exists.');
    return;
  }
  
  // Nickname does not exist, so create it
  const data = {
    nickname: nickname,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  };
  const docRef = await db.collection('nicknames').add(data);
  
  res.json({ message: 'Nickname created successfully!', id: docRef.id });
  });
  

// POST: Add chat message
exports.addChatMessage = functions.https.onRequest(async (req, res) => {
  // TODO: Validate input
  const data = {
    message: req.body.message,
    nickname: req.body.nickname,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  };
  const docRef = await db.collection('chatHistory').add(data);
  res.json({ message: 'Chat message added successfully!', id: docRef.id });
});

// GET: Get all messages
exports.getChatHistory = functions.https.onRequest(async (req, res) => {
  const snapshot = await db.collection('chatHistory').get();
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(data);
});

// GET: Get all messages by a user
exports.getChatHistoryByNickname = functions.https.onRequest(async (req, res) => {
  const snapshot = await db.collection('chatHistory').where('nickname', '==', req.query.nickname).get();
  const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(data);
});
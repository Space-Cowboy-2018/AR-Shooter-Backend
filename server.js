const store = require('./store/store');
const express = require('express');
const app = express();
const socketio = require('socket.io');
let rooms = store.getState();
const unsubscribe = store.subscribe(() => {
  rooms = store.getState()
})
const PORT = process.env.PORT || 3030;

// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
app.get('/rooms', (req, res, next) => {
  res.json(rooms);
});

const server = app.listen(PORT);
const io = socketio(server);
require('./utils/sockets/sockets')(io);

module.exports = app;

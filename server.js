const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const PORT = process.env.PORT || 3030;

// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));

const server = http.createServer();
server.listen(PORT, () => {
  console.log('listening on', PORT);
});
server.on('request', app);
const io = socketio(server);

io.on('connection', socket => {
  let count = 0;
  console.log('A new client has connected!');
  console.log(socket.id);

  socket.on('position', ({ position, aim }) => {
    console.log('Id: ', socket.id);
    console.log('shooters position: ', position);

    socket.broadcast.emit('shot', position);

  });
  socket.on('gothit?', targetPlayer => {
    console.log('targets position', targetPlayer);
  });

  socket.on('disconnect', function() {
    console.log('i disconnected~');
    socket.removeAllListeners('gothit?');
    socket.removeAllListeners('position');
    socket.removeAllListeners('disconnect');
  });
});

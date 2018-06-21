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
  console.log('listening');
});
server.on('request', app);
const io = socketio(server);

io.on('connection', socket => {

  console.log('A new client has connected!');
  console.log(socket.id);

  socket.on('position', ({position, aim}) => {
    console.log('Id: ', socket.id)
    console.log('position: ', position);
    console.log('aim: ', aim);
  })
})

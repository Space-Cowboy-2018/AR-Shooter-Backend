const express = require('express');
const socketio = require('socket.io');
const app = express();
const PORT = process.env.PORT || 3030;
const { isHit } = require('./math.js');
let shooterPosition, shooterAim;
let rooms = {
  cow: 1,
  chicken: 1,
  moose: 1
};

// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
app.get('/rooms', (req, res, next) => {
  res.json(rooms);
});

const server = app.listen(PORT);
// server.on("request", app);
const io = socketio(server);

io.on('connection', socket => {
  let ourRoom = '';
  console.log('A new client has connected!', socket.id);
  socket.on('createRoom', ({ roomName, name }) => {
    ourRoom = roomName;
    console.log('this is our room name>>>>>', roomName);
    socket.join(roomName);
    rooms[roomName] = [name];
    socket.broadcast.emit('createdRoom', rooms);
    console.log('createdRoom!!!');
  });
  socket.on('joinRoom', ({ roomName, name }) => {
    ourRoom = roomName;
    socket.join(roomName);
    console.log('this is our room name on join>>>>', roomName);
    rooms[roomName].push(name);
  });
  socket.on('position', ({ position, aim }) => {
    console.log('rooms', ourRoom);
    shooterPosition = position;
    shooterAim = aim;
    socket.to(ourRoom).emit('shot', { position, aim });
  });
  socket.on('gothit?', targetPlayer => {
    console.log(socket.rooms);
    const didWeHit = isHit(shooterPosition, targetPlayer, shooterAim);
    console.log('DID WE HIT?>>>>' + didWeHit);
  });

  socket.on('disconnect', function() {
    console.log('i disconnected~', socket.id);
    socket.removeAllListeners('gothit?');
    socket.removeAllListeners('position');
    socket.removeAllListeners('disconnect');
  });
});

const socketio = require('socket.io');
const { isHit } = require('./math.js');
let shooterPosition, shooterAim;
const server = require('../../server');

// server.on("request", app);
const io = socketio(server);

io.on('connection', socket => {
  let ourRoom = '';
  console.log('A new client has connected!', socket.id);
  // ROOM LISTENERS
  socket.on('createRoom', name => {
    ourRoom = name;
    socket.join(name);
    rooms[name] = 1;
    socket.broadcast.emit('createdRoom', rooms);
  });
  socket.on('joinRoom', name => {
    ourRoom = name;
    socket.join(name);
    console.log('this is our room name on join>>>>', name); // TODO: REMOVE WHEN WE CAN JOIN ROOM ON THE FRONT-END
    rooms[name]++;
  });

  // START GAME LISTENER
  socket.on('startGame', () => {
    io.in(ourRoom).emit('gameHasStarted');
  });

  // IN-GAME LISTENERS
  socket.on('position', ({ position, aim }) => {
    shooterPosition = position;
    shooterAim = aim;
    socket.to(ourRoom).emit('shot', { position, aim });
  });
  socket.on('gothit?', targetPlayer => {
    const didWeHit = isHit(shooterPosition, targetPlayer, shooterAim);
    console.log('DID WE HIT?>>>>' + didWeHit); // TODO: REMOVE WHEN WE EMIT THE HIT BACK TO THE PLAYER THAT GOT HIT
  });

  // DISCONNECT
  socket.on('disconnect', function() {
    console.log('i disconnected~', socket.id);
    socket.removeAllListeners('gothit?');
    socket.removeAllListeners('position');
    socket.removeAllListeners('disconnect');
  });
});

module.exports = io;

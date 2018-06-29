const store = require('../../store/store');
const {
  addRoom,
  updatePlayer,
  addPlayerToRoom,
  deletePlayerFromRoom
} = require('../../store/actions');
const { isHit } = require('../math.js');
let shooterPosition, shooterAim;
const {
  CREATE_ROOM,
  JOIN_ROOM,
  START_GAME,
  SHOOT,
  IS_HIT,
  SHOT,
  GAME_STARTED,
  UPDATE_PLAYER_MOVEMENT,
  NEW_ROOM,
  LEAVE_ROOM
} = require('./socketEvents');
let rooms = store.getState();
const unsubscribe = store.subscribe(() => {
  rooms = store.getState();
});
module.exports = io => {
  io.on('connection', socket => {
    let ourRoom = '';
    console.log('A new client has connected!', socket.id);
    // ROOM LISTENERS
    socket.on(CREATE_ROOM, name => {
      ourRoom = name;
      socket.join(name);
      store.dispatch(addRoom(name));
      store.dispatch(addPlayerToRoom(name, {id: socket.id}));
      console.log('ABOUT TO EMIT');
      io.emit(NEW_ROOM, rooms);
    });
    socket.on(JOIN_ROOM, name => {
      ourRoom = name;
      socket.join(name);
      store.dispatch(addPlayerToRoom(name, {id: socket.id}));
    });
    socket.on(LEAVE_ROOM, roomName => {
      console.log("we hit leaveRoom", roomName)
      socket.leave(roomName);
      store.dispatch(deletePlayerFromRoom(roomName, {id: socket.id}));
      ourRoom = '';
    });

    // START GAME LISTENER
    socket.on(START_GAME, () => {
      io.in(ourRoom).emit(GAME_STARTED);
    });

    // IN-GAME LISTENERS
    socket.on(SHOOT, ({ position, aim }) => {
      shooterPosition = position;
      shooterAim = aim;

      const players = rooms[ourRoom];
      for (let i = 0; i < players.length; i++) {
        if (players[i].id === socket.id) continue;
        console.log('player', players[i]);
        if (isHit(shooterPosition, players[i].position, shooterAim)) {
          // emit hit.
          console.log('hit', socket.id);
        }
      }
    });

    socket.on(UPDATE_PLAYER_MOVEMENT, ({ position, aim }) => {
      const player = {
        id: socket.id,
        position,
        aim
      };
      store.dispatch(updatePlayer(ourRoom, player));
    });

    // DISCONNECT
    socket.on('disconnect', function() {
      console.log('i disconnected~', socket.id);
      socket.removeAllListeners('gothit?');
      socket.removeAllListeners('position');
      socket.removeAllListeners('disconnect');
    });
  });
};

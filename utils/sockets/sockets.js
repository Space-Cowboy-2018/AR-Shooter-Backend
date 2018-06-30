const store = require('../../store/store');
const {
  addRoom,
  updatePlayer,
  addPlayerToRoom,
  deletePlayerFromRoom
} = require('../../store/actions');
const { isHit } = require('../math.js');
const INITIAL_HEALTH = 10;
const {
  CREATE_ROOM,
  JOIN_ROOM,
  START_GAME,
  SHOOT,
  SHOT,
  GAME_STARTED,
  UPDATE_PLAYER_MOVEMENT,
  UPDATE_ROOMS,
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
    socket.on(CREATE_ROOM, (roomName, playerName) => {
      ourRoom = roomName;
      socket.join(roomName);
      store.dispatch(addRoom(roomName));
      store.dispatch(
        addPlayerToRoom(roomName, {
          id: socket.id,
          health: INITIAL_HEALTH,
          name: playerName
        })
      );
      console.log('ABOUT TO EMIT');
      io.emit(UPDATE_ROOMS, rooms);
    });
    socket.on(JOIN_ROOM, (roomName, playerName) => {
      ourRoom = roomName;
      socket.join(roomName);
      store.dispatch(
        addPlayerToRoom(roomName, {
          id: socket.id,
          health: INITIAL_HEALTH,
          name: playerName
        })
      );
    });
    socket.on(LEAVE_ROOM, roomName => {
      console.log('we hit leaveRoom', roomName);
      socket.leave(roomName);
      store.dispatch(deletePlayerFromRoom(roomName, { id: socket.id }));
      ourRoom = '';
      io.emit(UPDATE_ROOMS, rooms);
    });

    // START GAME LISTENER
    socket.on(START_GAME, () => {
      io.in(ourRoom).emit(GAME_STARTED);
    });

    // IN-GAME LISTENERS
    socket.on(SHOOT, ({ position, aim }) => {
      const players = rooms[ourRoom];
      for (let i = 0; i < players.length; i++) {
        if (players[i].id === socket.id) continue;
        if (isHit(position, players[i].position, aim)) {
          // emit hit.
          store.dispatch(
            updatePlayer(ourRoom, {
              id: players[i].id,
              health: players[i].health - 1
            })
          );
          socket.to(players[i].id).emit(SHOT);
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
      socket.leave(ourRoom);
      store.dispatch(deletePlayerFromRoom(ourRoom, { id: socket.id }));
      io.emit(UPDATE_ROOMS, rooms);
      socket.removeAllListeners('gothit?');
      socket.removeAllListeners('position');
      socket.removeAllListeners('disconnect');
    });
  });
};

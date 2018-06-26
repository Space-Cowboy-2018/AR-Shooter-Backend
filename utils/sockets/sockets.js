const store = require('../../store/store');
const {addRoom} = require('../../store/actions')
const { isHit } = require('../math.js');
let shooterPosition, shooterAim;
const {
  CREATE_ROOM,
  JOIN_ROOM,
  START_GAME,
  SHOOT,
  IS_HIT,
  SHOT,
  GAME_STARTED
} = require('./socketEvents');
let rooms = store.getState();
const unsubscribe = store.subscribe(() => {
  rooms = store.getState();
})
module.exports = io => {
  io.on('connection', socket => {
    let ourRoom = '';
    console.log('A new client has connected!', socket.id);
    // ROOM LISTENERS
    socket.on(CREATE_ROOM, name => {
      ourRoom = name;
      socket.join(name);
      store.dispatch(addRoom(name, {id: socket.id}))
    });
    socket.on(JOIN_ROOM, name => {
      ourRoom = name;
      socket.join(name);
      console.log('this is our room name on join>>>>', name); // TODO: REMOVE WHEN WE CAN JOIN ROOM ON THE FRONT-END
      rooms[name]++;
    });

    // START GAME LISTENER
    socket.on(START_GAME, () => {
      io.in(ourRoom).emit(GAME_STARTED);
    });

    // IN-GAME LISTENERS
    socket.on(SHOOT, ({ position, aim }) => {
      shooterPosition = position;
      shooterAim = aim;
      socket.to(ourRoom).emit(SHOT, { position, aim });
    });
    socket.on(IS_HIT, targetPlayer => {
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
};

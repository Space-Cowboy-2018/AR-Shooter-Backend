// ACTIONS
const ADD_ROOM = 'ADD_ROOM';

// ACTION CREATORS
const addRoom = (roomName, initialPlayer) => ({
  type: ADD_ROOM,
  roomName,
  initialPlayer
});

module.exports = { ADD_ROOM, addRoom };

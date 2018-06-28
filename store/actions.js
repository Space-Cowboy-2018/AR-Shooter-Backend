// ACTIONS
const ADD_ROOM = 'ADD_ROOM';
const ADD_PLAYER_TO_ROOM = 'ADD_PLAYER_TO_ROOM';
const DELETE_PLAYER_FROM_ROOM = 'DELETE_PLAYER_FROM_ROOM'

const UPDATE_PLAYER = 'UPDATE_PLAYER';

// ACTION CREATORS
const addRoom = (roomName, initialPlayer) => ({
  type: ADD_ROOM,
  roomName,
  initialPlayer
});

const addPlayerToRoom = (roomName, player) => ({
  type: ADD_PLAYER_TO_ROOM,
  roomName,
  player
});

const updatePlayer = (roomName, player) => ({
  type: UPDATE_PLAYER,
  roomName,
  player
});

const deletePlayerFromRoom = (roomName, player) => ({
  type: DELETE_PLAYER_FROM_ROOM,
  roomName,
  player
});


module.exports = { ADD_ROOM, addRoom, ADD_PLAYER_TO_ROOM, addPlayerToRoom, UPDATE_PLAYER, updatePlayer, DELETE_PLAYER_FROM_ROOM, deletePlayerFromRoom };

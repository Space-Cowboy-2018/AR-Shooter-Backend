const { ADD_ROOM, ADD_PLAYER_TO_ROOM } = require('./actions');

const reducer = (state = {}, action) => {
  const stateCopy = { ...state };
  switch (action.type) {
    case ADD_ROOM:
      stateCopy[action.roomName] = [action.initialPlayer];
      return stateCopy;
    case ADD_PLAYER_TO_ROOM:
      stateCopy[action.roomName] = [
        ...stateCopy[action.roomName],
        action.player
      ];
      return stateCopy;

    default:
      return state;
  }
};

module.exports = reducer;

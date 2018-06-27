const { ADD_ROOM, ADD_PLAYER_TO_ROOM, UPDATE_PLAYER } = require('./actions');

const reducer = (state = {}, action) => {
  const stateCopy = { ...state };
  let playersArr, index;
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
    case UPDATE_PLAYER:
      playersArr = stateCopy[action.roomName].slice();
      index = playersArr.findIndex(
        player => player.id === action.player.id
      );
      playersArr.splice(index, 1, action.player);
      stateCopy[action.roomName] = playersArr;
      return stateCopy;
    default:
      return state;
  }
};

module.exports = reducer;

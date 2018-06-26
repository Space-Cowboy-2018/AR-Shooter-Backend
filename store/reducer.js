const { ADD_ROOM } = require('./actions');

const reducer = (state = {}, action) => {
  const stateCopy = { ...state };
  switch (action.type) {
    case ADD_ROOM:
      stateCopy[action.roomName] = [action.initialPlayer];
      return stateCopy;
    default:
      return state;
  }
};

module.exports = reducer;

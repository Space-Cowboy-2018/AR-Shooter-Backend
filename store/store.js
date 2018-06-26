const { createStore, applyMiddleware } = require('redux');
const loggingMiddleware = require('redux-logger');
const reducer = require('./reducer');

module.exports = createStore(reducer, applyMiddleware(loggingMiddleware));

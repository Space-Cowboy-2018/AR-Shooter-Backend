# Space Cowboy


## AR Laser Tag

Solarized dark             |  Solarized Ocean
:-------------------------:|:-------------------------:
<img src="https://github.com/Space-Cowboy-2018/proof-of-concept/blob/master/public/preview1.gif" width="150">  |  <img src="https://github.com/Space-Cowboy-2018/proof-of-concept/blob/master/public/preview3.gif" width="150">

### Gameplay Mechanics
Space Cowboy is designed to be an Augmented Reality mutliply player laser-tag. Players can create seperate rooms and begin a game when all players are ready. During the game play phase each player starts with 100 HP. Everytime you tag your opponent they lose 10HP, when you health goes to 0 you lose. You can obtain more health by grabbing an in game heart. When all your opponents are out you win.

### Architecture
Space Cowboy
Frontend : [React-Native](https://facebook.github.io/react-native/),[ Socket.io](https://socket.io/), [Three.js](https://threejs.org/), [Expo-AR](https://expo.io/)

Backend : [Node.js](https://nodejs.org/en/), [Socket.io](https://socket.io/), [Redux](https://redux.js.org/), [Express.js](https://expressjs.com/)

Testing : [Mocha](https://mochajs.org/)

### How to Play

-Create Name

-Create Room

-Start Game by lining up all the phones together to sync location

-Go pew pew!!!

-Grab the heart to get more HP!

-Be the last one standing



- see list of rooms. https://ar-shooter-server.herokuapp.com/rooms

- run tests with command ```npm test```

- start server in dev mode ```npm run start-dev```

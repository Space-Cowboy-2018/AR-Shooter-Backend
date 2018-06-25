const express = require("express");
const socketio = require("socket.io");
const app = express();
const PORT = process.env.PORT || 3030;
const { isHit } = require("./math.js");
let shooterPosition, shooterAim;
let rooms = {
  cow: 1,
  chicken: 1,
  moose: 1
};

// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
app.get("/rooms", (req, res, next) => {
  res.json(rooms);
});

const server = app.listen(PORT);
// server.on("request", app);
const io = socketio(server);

io.on("connection", socket => {
  let ourRoom = "";
  console.log("A new client has connected!", socket.id);
  socket.on("createRoom", name => {
    ourRoom = name;
    console.log("this is our room name>>>>>", name);
    socket.join(name);
    rooms[name] = 1;
    socket.broadcast.emit("createdRoom", rooms);
    console.log("createdRoom!!!");
  });
  socket.on("joinRoom", name => {
    ourRoom = name;
    socket.join(name);
    console.log("this is our room name on join>>>>", name);
    rooms[name]++;
  });
  socket.on("position", ({ position, aim }) => {
    console.log("rooms", ourRoom);
    shooterPosition = position;
    shooterAim = aim;
    socket.to(ourRoom).emit("shot", position);
  });
  socket.on("gothit?", targetPlayer => {
    console.log(socket.rooms);
    const didWeHit = isHit(shooterPosition, targetPlayer, shooterAim);
    console.log("DID WE HIT?>>>>" + didWeHit);
  });

  socket.on("disconnect", function() {
    console.log("i disconnected~", socket.id);
    socket.removeAllListeners("gothit?");
    socket.removeAllListeners("position");
    socket.removeAllListeners("disconnect");
  });
});

const express = require("express");
const socketio = require("socket.io");
const app = express();
const PORT = process.env.PORT || 3030;
const { isHit } = require("./math.js");
let shooterPosition, shooterAim;
// CG: make sure objects use const. Also, note with a TODO: Will remove this default values when X. 
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

//CG we should make a Socket Manager Util File. 
io.on("connection", socket => {
  let ourRoom = "";
  console.log("A new client has connected!", socket.id);
  // room:join 
  // const ROOM_CREATE = 'ROOM:CREATE'; 
  socket.on("createRoom", name => {
    ourRoom = name;
    //CG: make sure to remove console.logs upon verification of things working or note that you will remove them. 
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
    socket.to(ourRoom).emit('shot', {position, aim});
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

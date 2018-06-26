const express = require('express');
const app = express();
const PORT = process.env.PORT || 3030;
let rooms = {
  cow: 1,
  chicken: 1,
  moose: 1
};
// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
app.get('/rooms', (req, res, next) => {
  res.json(rooms);
});

app.listen(PORT);

module.exports = app;

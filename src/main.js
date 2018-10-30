'use strict';

import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import path from 'path'

const publicPath = path.join(__dirname, '../public') 
const app = express();
const server = http.Server(app);
const allowedOrigins = "http://localhost:* http://127.0.0.1:* https://secure-garden-82806.herokuapp.com:*";
const io = new SocketIO(server, {
  origins: allowedOrigins,
});
const port = process.env.PORT || 3000;

app.use(express.static(publicPath))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


io.on('connection', (socket) => {
  console.log("Connection: ", socket.id);

  socket.on('forward', () => {
    console.log('forward ===>')
    socket.broadcast.emit('forward');
  });

  socket.on('back', () => {
    console.log('back ===>')
    // socket.broadcast.emit('back');
    socket.broadcast.emit('back');
  });

  socket.on('test', (data) => {
    console.log('data ', data)
  });
});

server.listen(port, () => {
  console.log('[INFO] Listening on *:' + port);
});
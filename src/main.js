'use strict';

import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import path from 'path'

const publicPath = path.join(__dirname, '../public') 
const app = express();
const server = http.Server(app);
const io = new SocketIO(server);
const port = process.env.PORT || 3000;

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log("Connection: ", socket.id);

  socket.on('forward', () => {
    // console.log('forward ===>')
    socket.broadcast.emit('forward');
  });

  socket.on('back', () => {
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
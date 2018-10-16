'use strict';

import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import path from 'path'

const publicPath = path.join(__dirname, '../public') 
let app = express();
let server = http.Server(app);
let io = new SocketIO(server);
let port = process.env.PORT || 3000;

app.use(express.static(publicPath))

io.on('connection', (socket) => {
  console.log("Connection");

  socket.emit('ding');

  socket.on('ding', () => {
    socket.emit('dong');
  });
});

server.listen(port, () => {
  console.log('[INFO] Listening on *:' + port);
});
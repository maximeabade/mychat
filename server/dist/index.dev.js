"use strict";

var express = require('express');

var app = express();

var http = require('http');

var cors = require('cors');

var _require = require("socket.io"),
    Server = _require.Server;

app.use(cors());
var server = http.createServer(app);
var io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});
io.on("connection", function (socket) {
  console.log("User connected: ".concat(socket.id));
  socket.on("join_room", function (data) {
    socket.join(data);
    console.log("User joined room: ".concat(socket.id, " joined room: ").concat(data));
  });
  socket.on("send_message", function (data) {
    console.log("User sent message: ".concat(data));
  });
  socket.on(disconnect, function (err) {
    console.log("disconnect", socket.id);
  });
});
server.listen(3001, function () {
  console.log("Server is running on port 3000");
});
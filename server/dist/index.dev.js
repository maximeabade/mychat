"use strict";

var express = require("express");

var app = express();

var http = require("http");

var cors = require("cors");

var _require = require("socket.io"),
    Server = _require.Server;

app.use(cors());
var server = http.createServer(app);
var io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});
io.on("connection", function (socket) {
  console.log("User Connected: ".concat(socket.id));
  socket.on("join_room", function (data) {
    socket.join(data);
    console.log("User with ID: ".concat(socket.id, " joined room: ").concat(data));
  });
  socket.on("send_message", function (data) {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", function () {
    console.log("User Disconnected", socket.id);
  });
});
server.listen(3000, function () {
  console.log("SERVER RUNNING");
});
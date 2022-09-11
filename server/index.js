const express = require('express');
const  app = express();
const http = require('http')
const cors = require('cors');
const { Server } = require("socket.io");
app.use(cors());



const server = http.createServer(app);

const io = new Server(server , {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
})

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User joined room: ${socket.id} joined room: ${data}`);
    });
    socket.on("send_message", (data) => {
        console.log(`User sent message: ${data}`);
    });
    socket.on(disconnect, (err) => {
        console.log("disconnect", socket.id);
    });    
});


server.listen(3001, () => {
   console.log("Server is running on port 3000"); 
   
});


const express = require('express');
const  app = express();
const http = require('http')
const cors = require('cors');
const { Server } = require("socket.io");
app.use(cors());



const server = http.createServer(app);

const io = new Server(server , {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "DELETE"],
    }
})

io.on("connection", (socket) => {

    socket.on("join_room", (data) => {
        socket.join(data);
    });
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
    socket.on(disconnect, () => {
        console.log("disconnect", socket.id);
    });    
});


server.listen(3000, () => {
   console.log("Server is running on port 3000"); 
   
});


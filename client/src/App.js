import './App.css';
import io from 'socket.io-client';
import { useState} from 'react';
import Chat from "./Chat";

const socket = io('http://localhost:3000');
console.log(socket);


function App() {

  //state
  const [username,setUsername] = useState("");
  const [room,setRoom] = useState("");

  //action

  const joinRoom = () => {
    if(username !== "" && room !== ""){
      socket.emit("join_room",room);
    }
  };

  return (
    <div className="App">
      <h3>Join the chat</h3>
      <input type="text" placeholder="Enter your name" 
        onChange={(event) => {
          setUsername(event.target.value)
        }} 
      />
      <input type="text" placeholder="Room ID" 
        onChange={(event) => {
          setRoom(event.target.value)
        }} 
      />
      <button onClick={joinRoom}>Join</button>

      <Chat socket={socket} username={username}  room={room}/>

    </div>
  );
}

export default App;

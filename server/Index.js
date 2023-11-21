const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const io = new Server({
    cors:true
});
const cors=require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors())
const emailToSocketMapping = new Map();
const socketToEMailMapping=new Map()
io.on("connection", (socket) => {
    console.log("new Connection");
  socket.on("join-room", (data) => {
    console.log(data,"data");  
    const { roomId, emailId } = data;
    emailToSocketMapping.set(emailId, socket.id);
    socketToEMailMapping.set(socket.id,emailId)
    socket.join(roomId);
    socket.emit("joined-room",{roomId})
    socket.broadcast.to(roomId).emit("user-joined", { emailId });
   
  });
  socket.on('call-user',(data)=>{
    const {emailId,offer}=data
    const fromEmail=socketToEMailMapping.get(socket.id)
    const socketId=emailToSocketMapping.get(emailId)
    socket.to(socketId).emit('incomming-call',{from:fromEmail,offer})
})
socket.on('call-accepted',(data)=>{
    console.log("fsdfsdfsdfsdfsdfsdfs");

    const {emailId,ans}=data
    const socketId=emailToSocketMapping.get(emailId)
    socket.to(socketId).emit('call-accepted',{ans})
})

});

app.listen(8800, () => console.log("App is running on 8800"));
io.listen(8001);

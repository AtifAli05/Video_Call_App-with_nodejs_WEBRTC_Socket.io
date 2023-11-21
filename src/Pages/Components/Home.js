import React, { useState, useEffect, useCallback } from "react";
import { useSocket } from "../../Providers/Socket";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const [email, setEmail] = useState();
  const [roomId, setRoomId] = useState();
  // socket.emit("join-room", { roomId: "1", emailId: "any@ex.com" });
  const handleRoomJoin = () => {
    socket.emit("join-room", { roomId: roomId, emailId: email });
  };
  const handleRoomJoined = useCallback(async ({ roomId }) => {
    console.log(roomId, "jpined");
    navigate(`/room/${roomId}`);
  },[navigate]);
  useEffect(() => {
    socket.on("joined-room", handleRoomJoined);

    return () => {
      socket.off("joined-room", handleRoomJoined);
    };
  }, []);
  return (
    <div className="mainContainer">
      <div className="container">
        <input
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          type="text"
          placeholder="Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email0"
        />
        <button onClick={() => handleRoomJoin()}>Enter Room</button>
      </div>
    </div>
  );
};

export default Home;

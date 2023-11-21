import React, { useCallback, useEffect } from "react";
import { useSocket } from "../../Providers/Socket";
import { usePeer } from "../../Providers/Peer";
const Room = () => {
  const { socket } = useSocket();
  const { peer, createOffer, createAnswers, setRemoteAnswer } = usePeer();

  const hanldeNewUserJoined = useCallback(
    async (data) => {
      const { emailId } = data;
      console.log("fsffsfsf,", emailId);
      const offer = await createOffer();
      socket.emit("call-user", { emailId, offer });
    },
    [createOffer, socket]
  );

  const handleIncommingCall = useCallback(async (data) => {
    const { from, offer } = data;
    console.log("incomming--calll");
    const ans = await createAnswers(offer);
    socket.emit("call-accepted", { emailId: from, ans });
  }, [createAnswers,socket]);
  const handleCallAccepted = useCallback(
    async (data) => {
      const { ans } = data;
      console.log("call got accepted",ans);
      await setRemoteAnswer(ans);
    },
    [setRemoteAnswer]
  );
  useEffect(() => {
    socket.on("joined-room", hanldeNewUserJoined);
    socket.on("incomming-call", handleIncommingCall);
    socket.on("call-accepted", handleCallAccepted);

    return () => {
      socket.off("joined-room", hanldeNewUserJoined);
      socket.off("incomming-call", handleIncommingCall);
      socket.off("call-accepted", handleCallAccepted);
    };
  }, [hanldeNewUserJoined, socket]);
  return <div>Room</div>;
};

export default Room;

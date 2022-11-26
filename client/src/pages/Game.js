import React, { useEffect, useState } from "react";
import MainRoom from "../components/MainRoom/MainRoom";
import WaitingRoom from "../components/WaitingRoom/WaitingRoom";

const Game = ({ socket, roomCode, username }) => {
  const [start, setStart] = useState(false);
  useEffect(() => {
    socket.emit("game_load", roomCode);
    socket.on("game_start", (canStart) => {
      if (canStart) {
        setStart(true);
      }
    });
    return () => {
      socket.off("game_load");
      socket.off("game_start");
    };
  }, [socket, roomCode]);

  return (
    <div className="min-h-screen flex" style={{ background: "#131313" }}>
      {!start ? (
        <WaitingRoom />
      ) : (
        <MainRoom socket={socket} roomCode={roomCode} name={username} />
      )}
    </div>
  );
};

export default Game;

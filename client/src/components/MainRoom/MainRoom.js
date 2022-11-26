import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { VscDebugRestart } from "react-icons/vsc";
import { Button } from "antd";
import Cell from "../Cell/Cell";
import useWindowSize from "../../CustomHook/useWindowSize";
import ModalComponent from "../Modal/Modal";
import "./MainRoom.css";
import xIcon from "../../assets/ic_X.svg";
import oIcon from "../../assets/ic_O.svg";
import congratsImg from "../../assets/wnner.png";
import shake from "../../assets/shake.png";
import loser from "../../assets/loser.png";

import LogOut from "../LogOut/LogOut";

const MainRoom = ({ socket, roomCode, name }) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [canPlay, setCanPlay] = useState(true);
  const [rival, setRival] = useState(true);
  const [isGameFinished, setGameFinished] = useState(false);
  const [isGameDraw, setGameDraw] = useState(false);
  const { width, height } = useWindowSize();

  useEffect(() => {
    socket.on("updateGame", ({ id, restart }) => {
      if (restart) {
        setBoard(["", "", "", "", "", "", "", "", ""]);
        setCanPlay(true);
        setGameFinished(false);
        setGameDraw(false);
      } else {
        setBoard((data) => ({ ...data, [id]: "O" }));
        setCanPlay(true);
      }
    });

    return () => socket.off("updateGame");
  });

  useEffect(() => {
    socket.emit("getUsers", { roomCode, name });
    socket.on("updateUsers", (rival) => {
      setRival(rival);
    });
    return () => {
      socket.off("getUsers");
      socket.off("updateUsers");
    };
  });

  useEffect(() => {
    if (
      (board[0] === "X" && board[1] === "X" && board[2] === "X") ||
      (board[3] === "X" && board[4] === "X" && board[5] === "X") ||
      (board[6] === "X" && board[7] === "X" && board[8] === "X") ||
      (board[0] === "X" && board[3] === "X" && board[6] === "X") ||
      (board[1] === "X" && board[4] === "X" && board[7] === "X") ||
      (board[2] === "X" && board[5] === "X" && board[8] === "X") ||
      (board[0] === "X" && board[4] === "X" && board[8] === "X") ||
      (board[2] === "X" && board[4] === "X" && board[6] === "X") ||
      (board[0] === "O" && board[1] === "O" && board[2] === "O") ||
      (board[3] === "O" && board[4] === "O" && board[5] === "O") ||
      (board[6] === "O" && board[7] === "O" && board[8] === "O") ||
      (board[0] === "O" && board[3] === "O" && board[6] === "O") ||
      (board[1] === "O" && board[4] === "O" && board[7] === "O") ||
      (board[2] === "O" && board[5] === "O" && board[8] === "O") ||
      (board[0] === "O" && board[4] === "O" && board[8] === "O") ||
      (board[2] === "O" && board[4] === "O" && board[6] === "O")
    ) {
      setBoard(["", "", "", "", "", "", "", "", ""]);
      setGameFinished(true);
    }

    if (
      Object.values(board).every((cell) => cell === "X" || cell === "O") &&
      !isGameFinished
    ) {
      setGameDraw(true);
    } else {
      setGameDraw(false);
    }
  }, [board]);

  const handleCellClick = (e) => {
    const id = e.currentTarget.id;
    if (canPlay && board[id] === "") {
      setBoard((data) => ({ ...data, [id]: "X" }));

      socket.emit("play", { id, roomCode, restart: false });
      setCanPlay(false);
    }
  };

  const restartGame = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    socket.emit("play", { restart: true, roomCode });
    setCanPlay(true);
    setGameFinished(false);
  };

  return (
    <>
      <LogOut />

      <main>
        <div className="absolute top-20 right-18 right-7">
          <ModalComponent name={name} rival={rival} restartGame={restartGame} />
        </div>

        <Button
          shape="circle"
          className="absolute top-32 right-18 right-7"
          type="primary"
          style={{
            background: "white",
            color: "black",
            justifyContent: "center",
            display: "flex",
          }}
          onClick={restartGame}
        >
          <VscDebugRestart fontSize={"24px"} />
        </Button>

        {isGameFinished ? (
          <>
            {!canPlay ? (
              <>
                <Confetti width={width} height={height} />
                <img src={congratsImg} alt="congrats img" />
              </>
            ) : (
              <img src={loser} alt="you lose" />
            )}
          </>
        ) : (
          <div>
            <h2 className="flex text-white font-bold tracking-widest justify-center items-center text-3xl mb-4">
              {!isGameDraw ? (
                <>
                  It's{" "}
                  <img
                    src={canPlay ? xIcon : oIcon}
                    style={{ width: "28px" }}
                    alt="icon"
                    className="mx-3"
                  />{" "}
                  turn
                </>
              ) : null}
            </h2>
            {isGameDraw ? (
              <img src={shake} style={{ width: "250px" }} alt="game draw" />
            ) : (
              <section className="main-section">
                {new Array(9).fill("").map((cell, index) => {
                  return (
                    <Cell
                      handleCellClick={handleCellClick}
                      key={index}
                      id={index.toString()}
                      text={board[index]}
                    />
                  );
                })}
              </section>
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default MainRoom;

import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import io from "socket.io-client";
import Error from "./pages/Error";
import Game from "./pages/Game";
import Register from "./pages/Register";
import { PrivateRoute } from "./components/ProtectedRoute/ProtectedRoute";
import Cookies from "universal-cookie";
const socket = io.connect("http://localhost:5000");

const App = () => {
  const [roomCode, setRoomCode] = useState("");
  const [username, setUserName] = useState("");

  const cookie = new Cookies();
  let isAuth = cookie.get("token_chat_user");

  useLocation();

  useEffect(() => {
    if (roomCode.trim() !== "" && username.trim() !== "") {
      socket.emit("joinRoom", { roomCode, username });
    }
  }, [roomCode, username]);

  useEffect(() => {
    window.onbeforeunload = function (e) {
      cookie.remove("token_chat_user");
    };
  });

  return (
    <div className="min-h-screen" style={{ background: "#232323" }}>
      <Routes>
        <Route
          path="/"
          element={
            !isAuth ? (
              <Register
                setRoomCode={setRoomCode}
                setUserName={setUserName}
                socket={socket}
              />
            ) : (
              <Navigate to={"/game"} />
            )
          }
        />

        <Route
          path="/game"
          element={
            <PrivateRoute>
              <Game socket={socket} roomCode={roomCode} username={username} />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;

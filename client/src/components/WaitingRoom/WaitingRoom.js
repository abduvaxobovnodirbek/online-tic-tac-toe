import React from "react";
import Loader from "../Loader/Loader.js";
import { BiLogOutCircle } from "react-icons/bi";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const WaitingRoom = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  return (
    <>
      <BiLogOutCircle
        onClick={() => {
          cookie.remove("token_chat_user");
          navigate("/");
        }}
        style={{
          color: "red",
          fontSize: "40px",
          position: "absolute",
          right: "25px",
          top: "25px",
        }}
        className="hover:cursor-pointer"
      />
      <h1 className="font-bold text-white items-center flex justify-center  w-screen">
        <span className="text-xl">Waiting your opponent</span>
        {<Loader />}
      </h1>
    </>
  );
};

export default WaitingRoom;

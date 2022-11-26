import React from "react";
import Loader from "../Loader/Loader.js";
import LogOut from "../LogOut/LogOut.js";

const WaitingRoom = () => {
  return (
    <>
      <LogOut />
      <h1 className="font-bold text-white items-center flex justify-center  w-screen">
        <span className="text-xl">Waiting your opponent</span>
        {<Loader />}
      </h1>
    </>
  );
};

export default WaitingRoom;

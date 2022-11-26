import React from "react";
import { BiLogOutCircle } from "react-icons/bi";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const LogOut = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  return (
    <div>
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
    </div>
  );
};

export default LogOut;

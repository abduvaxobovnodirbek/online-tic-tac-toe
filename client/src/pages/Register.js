import React from "react";
import RegisterForm from "../components/FillingForm/Form";
const Register = ({ setRoomCode, setUserName ,socket}) => {
  return (
    <div>
      <RegisterForm
        setRoomCode={setRoomCode}
        setUserName={setUserName}
        socket = {socket}
      />
    </div>
  );
};

export default Register;

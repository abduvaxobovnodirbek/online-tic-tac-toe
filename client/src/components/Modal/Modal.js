import React, { useState } from "react";
import { Button, Modal } from "antd";
import { AiOutlineInfoCircle } from "react-icons/ai";
import xIcon from "../../assets/ic_X.svg";
import oIcon from "../../assets/ic_O.svg";

const App = ({ name, rival }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="">
      <AiOutlineInfoCircle
        onClick={() => setModalOpen(true)}
        className="hover:cursor-pointer"
        style={{ fontSize: "30px", color: "white"}}
      />
      <Modal
        centered
        open={modalOpen}
        cancelText="Close"
        okButtonProps={{ style: { display: "none" } }}
        cancelButtonProps = {{style:{border:'1px solid white',color:'white',width:'100px',letterSpacing:'3px' }}}
        onCancel={() => setModalOpen(false)}
      >
        <div className="text-white font-bold tracking-widest  w-80 text-lg flex justify-around   mx-auto">
          <h1 className="flex flex-col text-center">
            <span className="text-gray-500"> Player name</span>
            <span className="font-bold">{name}</span>
          </h1>
          <h1 className="flex flex-col text-center">
            <span  className="text-gray-500">  Rival name</span>
            <span className="font-bold">{rival}</span>
          </h1>
        </div>
        <div className="text-white font-bold tracking-widest  mt-3 w-80 text-lg flex justify-around    mx-auto">
            <img
              src={xIcon}
              style={{ width: "25px" }}
              alt="icon"
              className=""
            />
            <img
              src={oIcon}
              style={{ width: "25px" }}
              alt="icon"
              className=""
            />
        </div>
      </Modal>
    </div>
  );
};
export default App;

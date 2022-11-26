import "./Cell.css";
import xImg from "../../assets/ic_X.svg";
import oImg from "../../assets/ic_O.svg";

const Cell = ({ handleCellClick, id, text }) => {
  return (
    <div id={id} className="cell" onClick={handleCellClick}>
      {text === "X" ? (
        <img src={xImg} alt="X" style={{ width: "40px" }} />
      ) : text === "O" ? (
        <img style={{ width: "40px" }} src={oImg} alt="0" />
      ) : (
        text
      )}
    </div>
  );
};

export default Cell;

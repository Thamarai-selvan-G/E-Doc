import React, { useRef } from "react";
import "./Home.css";
import { IoMdAdd } from "react-icons/io";
import { SlClose } from "react-icons/sl";
import { GrFormClose } from "react-icons/gr";
import { VscCheck } from "react-icons/vsc";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { myReducers } from "../../store/Store";
const Home = () => {
  let [display, setDisplay] = useState(false);
  let [css, setCss] = useState(false);

  let [userName, setUserName] = useState("");
  const [getarr, setgetarr] = useState([]);

  let dispatch = useDispatch();

  function sendUser() {
    let updateuser = [...getarr, userName];
    setgetarr(updateuser);
    dispatch(myReducers.setUsers(updateuser));
    setDisplay(!display);
    setCss(!css);
  }

  return (
    <div className="parentContainer">
      <div className={css == true ? "backBlack2" : "backBlack"}>
        <div className="header">
          <h1 className="head">Upload Documents</h1>
          <button
            className="addUser"
            onClick={() => (setDisplay(!display), setCss(!css))}>
            <span>
              <IoMdAdd />
            </span>{" "}
            Add Applicant
          </button>
        </div>
      </div>
      {display && (
        <div className="userInfo">
          <div className="lineOne">
            <h3> Add applicant</h3>
            <p onClick={() => (setDisplay(!display), setCss(!css))}>
              <SlClose />
            </p>
          </div>
          <div className="lineTwo">
            <label>Name</label>
            <input type="text" onChange={(e) => setUserName(e.target.value)} />
          </div>
          <div className="lineThree">
            <button className="btn1" onClick={sendUser}>
              <p>
                <VscCheck />
              </p>{" "}
              Save
            </button>
            <button
              onClick={() => (setDisplay(!display), setCss(!css))}
              className="btn2">
              <p>
                <GrFormClose />
              </p>{" "}
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

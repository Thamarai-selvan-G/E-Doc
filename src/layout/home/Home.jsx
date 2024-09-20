// components/Home.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { myReducers } from "../../store/Store";
import { IoMdAdd } from "react-icons/io";
import { SlClose } from "react-icons/sl";
import { GrFormClose } from "react-icons/gr";
import { VscCheck } from "react-icons/vsc";
import Upload from "../../components/upload/Upload";
import "./Home.css";

const Home = () => {
  let [display, setDisplay] = useState(false);
  let [css, setCss] = useState(false);
  let [userName, setUserName] = useState("");

  let dispatch = useDispatch();

  function sendUser() {
    dispatch(
      myReducers.addUser({
        name: userName,
        docName: [],
        docFile: "",
      })
    );
    setUserName("");
    setDisplay(false);
    setCss(false);
  }

  return (
    <div className="parentContainer">
      <div className={css ? "backBlack2" : "backBlack"}>
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
            <h3>Add applicant</h3>
            <p onClick={() => (setDisplay(!display), setCss(!css))}>
              <SlClose />
            </p>
          </div>
          <div className="lineTwo">
            <label>Name</label>
            <input
              type="text"
              autoFocus
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
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
      <Upload />
    </div>
  );
};

export default Home;

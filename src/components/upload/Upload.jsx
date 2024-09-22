import "./Upload.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { SlClose } from "react-icons/sl";
import { GrFormClose } from "react-icons/gr";
import { VscCheck } from "react-icons/vsc";
import { FiUpload } from "react-icons/fi";
import { IoCaretBackCircle } from "react-icons/io5";
import { IoCaretForwardCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { myReducers } from "../../store/Store";
import { useState } from "react";
import { useRef } from "react";

const Upload = () => {

  let userDatas = useSelector(function (data) {
    return data.user;
  });

  let dispatch = useDispatch();

  let [selectedUser, setSelectedUser] = useState(null);
  let [fileCss, setFileCss] = useState(false);
  let [dragActive, setDragActive] = useState(true);
  let [status, setstatus] = useState(true);
  let [drop, setDrop] = useState(true);
  let [selectedDocName, setSelectedDocName] = useState(null);
  let [currentIndex, setCurrentIndex] = useState(0);
   

  function deleteUser(e) {     // delete user name>>>
    dispatch(myReducers.deleteUser(e));

    if (selectedUser && selectedUser.name == e) {
      setSelectedUser(null);
    }
  }
  // console.log(userDatas);

  function userDocs(val) {    // selecetd user name(value)>>>
    if (!val) {
      setSelectedUser(null);
    }
    setSelectedUser(val);
    setFileCss(false);
  }

  let [css, setCss] = useState(false);
  let nameDoc = useRef("");

  function saveDocName() {     // set the doc name in store >>>
    if (nameDoc.current.value && selectedUser) {
      dispatch(
        myReducers.setDocName({
          selecteName: selectedUser.name,
          docName: nameDoc.current.value,
        })
      );
      let updatedUser = {
        ...selectedUser,
        docName: [...selectedUser.docName, nameDoc.current.value],
      };

      setSelectedUser(updatedUser);
    }
    setCss(false);
    nameDoc.current.value = "";
  }
  console.log(selectedUser);

  let chooseRef = useRef("");    // default choose styleing >>>
  function chooseFile() {
    if (chooseRef.current) {
      chooseRef.current.click();
    }
  }
  function handleFileChange(e) {   // choose file handle >>>
    let file = e.target.files[0];
    if (file && selectedUser) {
      let fileUrl = URL.createObjectURL(file);
      let updatedUser = {
        ...selectedUser,
        docFile: [...(selectedUser.docFile || []), fileUrl],
      };

      setSelectedUser(updatedUser);
    }
  }

  let handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  let handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {          // drage colourm >>>
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    let file = e.dataTransfer.files[0];
    if (file && selectedUser) {
      let fileUrl = URL.createObjectURL(file);
      let updatedUser = {
        ...selectedUser,
        docFile: [...(selectedUser.docFile || []), fileUrl],
      };
      setSelectedUser(updatedUser);
    }
  };

  function cancelDoc() {             // remove import doc >>>
    let updatedUser = { ...selectedUser, docFile: [] };
    return setSelectedUser(updatedUser);
  }

  function previousUser() {       // navigate btns >>>
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      userDocs(userDatas[currentIndex - 1]);
    }
  }
  function nextUser() {
    if (currentIndex < userDatas.length - 1) {
      setCurrentIndex(currentIndex + 1);
      userDocs(userDatas[currentIndex + 1]);
    }
  }

  return (
    <div>
      {css && (
        <div className="backBlack2">
          <div className="userInfo">
            <div className="lineOne">
              <h3>Add Document Name</h3>
              <p onClick={() => setCss(!css)}>
                <SlClose />
              </p>
            </div>
            <div className="lineTwo">
              <label>Name</label>
              <input type="text" autoFocus ref={nameDoc} />
            </div>
            <div className="lineThree">
              <button className="btn1" onClick={saveDocName}>
                <p>
                  <VscCheck />
                </p>
                Save
              </button>
              <button className="btn2" onClick={() => setCss(!css)}>
                <p>
                  <GrFormClose />
                </p>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="userParent">
        <div className="nameRow">
          {userDatas &&
            userDatas.map((value, index) => {
              return (
                <div
                  className={`nameHead ${
                    selectedUser && selectedUser.name === value.name
                      ? "active"
                      : ""
                  }`}
                  key={index}>
                  <h4
                    onClick={() => {
                      userDocs(value);
                    }}>
                    {value.name}
                  </h4>
                  <p onClick={() => deleteUser(value.name)}>
                    <RiDeleteBin5Fill />
                  </p>
                </div>
              );
            })}
        </div>
        {selectedUser && (
          <div className="userDetcontainer">
            <div className="userList">
              <div className="style">
                {selectedUser.docName &&
                  selectedUser.docName.map((val, index) => {
                    return (
                      <div
                        className={`docNameList ${
                          selectedDocName === val ? "activeDoc" : ""
                        }`}
                        key={index}>
                        <p
                          onClick={() => {
                            setFileCss(true);
                            setSelectedDocName(val);
                          }}>
                          {val}
                        </p>
                      </div>
                    );
                  })}
              </div>
              <p
                className="addDocBtn"
                onClick={() => {
                  setCss(true);
                }}>
                <IoMdAdd /> add doc
              </p>
            </div>

            {fileCss && (
              <div className="fileAddContainer">
                <div className="fileParent">
                  <div className="fileOptio">
                    <input
                      type="file"
                      name=""
                      id=""
                      style={{ display: "none" }}
                      ref={chooseRef}
                      onChange={handleFileChange}
                      onClick={() => setDrop(!drop)}
                    />
                    <button
                      className="chooseBtn"
                      onClick={() => chooseFile(chooseRef)}>
                      {" "}
                      + choose{" "}
                    </button>
                    <button
                      className="chooseUpload"
                      onClick={() => setstatus(!status)}>
                      {" "}
                      <FiUpload /> Upload
                    </button>
                    <button className="chooseCancel" onClick={cancelDoc}>
                      {" "}
                      <SlClose /> Cancel
                    </button>
                  </div>
                  {/* {selectedUser && */}
                  {selectedUser.docFile &&
                    selectedUser.docFile.map((valFile, index) => (
                      <div className="drag" key={index}>
                        <div className="picDiv">
                          <img src={valFile} alt="" className="file" />
                          <span className={status ? "status" : "status2"}>
                            Pending
                          </span>
                        </div>
                        <div className="cancel" onClick={cancelDoc}>
                          <SlClose />
                        </div>
                      </div>
                    ))}
                  {drop && dragActive && (
                    <div
                      className={`drgaImg ${dragActive ? "drag-active" : ""}`}
                      onDragOver={handleDrag}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}>
                      <p>Drag & Drop files here, or click to select files</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        <div className="navigateBtns">
          <button className="navBtns" onClick={previousUser}>
            {" "}
            <IoCaretBackCircle />
            Back
          </button>
          <button className="navBtns" onClick={nextUser}>
            {" "}
            <IoCaretForwardCircle />
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Upload;

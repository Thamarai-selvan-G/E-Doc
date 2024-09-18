import "./Upload.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { SlClose } from "react-icons/sl";
import { GrFormClose } from "react-icons/gr";
import { VscCheck } from "react-icons/vsc";
import { FiUpload } from "react-icons/fi";
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

  function deleteUser(e) {
    dispatch(myReducers.deleteUser(e));

    if (selectedUser && selectedUser.name == e) {
      setSelectedUser(null);
    }
  }
  // console.log(userDatas);

  function userDocs(val) {
    if (!val) {
      setSelectedUser(null);
    }
    setSelectedUser(val);
    setFileCss(false);
  }

  let [css, setCss] = useState(false);
  let nameDoc = useRef("");

  function saveDocName() {
    if (nameDoc.current.value && selectedUser) {
      dispatch(
        myReducers.setDocName({
          selecteName: selectedUser.name,
          docName: nameDoc.current.value,
        })
      );
      const updatedUser = {
        ...selectedUser,
        docName: [...selectedUser.docName, nameDoc.current.value],
      };

      setSelectedUser(updatedUser);
    }
    setCss(false);
    nameDoc.current.value = "";
  }
  //  console.log(selectedUser)

  let chooseRef = useRef("");
  function chooseFile() {
    if (chooseRef.current) {
      chooseRef.current.click();
    }
  }
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file && selectedUser) {
      const fileUrl = URL.createObjectURL(file); 
      const updatedUser = {
        ...selectedUser,
        docFile: [...(selectedUser.docFile || []), fileUrl],
      };

      setSelectedUser(updatedUser);
    }
  }
 

  return (
    <div>
      <div className="userParent">
        <div className="nameRow">
          {userDatas &&
            userDatas.map((value, index) => {
              return (
                <div className="nameHead" key={index}>
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
                      <div className="docNameList" key={index}>
                        <p onClick={() => setFileCss(true)}>{val}</p>
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
                    />
                    <button
                      className="chooseBtn"
                      onClick={() => chooseFile(chooseRef)}>
                      {" "}
                      + choose{" "}
                    </button>
                    <button className="chooseUpload">
                      {" "}
                      <FiUpload /> Upload
                    </button>
                    <button className="chooseCancel">
                      {" "}
                      <SlClose /> Cancel
                    </button>
                  </div>
                  {selectedUser &&
                    selectedUser.docFile &&
                    selectedUser.docFile.map((valFile, index) => (
                      <div className="drag" key={index}>
                        {/* <h1>{valFile}</h1> */}
                        <img src={valFile} alt="" />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {css && (
        <div className="userInfo">
          <div className="lineOne">
            <h3>Add Document Name</h3>
            <p onClick={() => setCss(!css)}>
              <SlClose />
            </p>
          </div>
          <div className="lineTwo">
            <label>Name</label>
            <input type="text" ref={nameDoc} />
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
      )}
    </div>
  );
};

export default Upload;

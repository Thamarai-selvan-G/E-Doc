import "./Upload.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { SlClose } from "react-icons/sl";
import { GrFormClose } from "react-icons/gr";
import { VscCheck } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { myReducers } from "../../store/Store";
import { useState } from "react";
import { useRef } from "react";
const Upload = () => {
  let userDatas = useSelector(function (data) {
    return data.user;
  });
  let dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);

  function deleteUser(e) {
    dispatch(myReducers.deleteUser(e));

    if (selectedUser && selectedUser.name == e) {
      setSelectedUser(null);
    }
  }
  console.log(userDatas);

  function userDocs(val) {
    if (!val) {
      setSelectedUser(null);
    }
    setSelectedUser(val);
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
        docName: [...selectedUser.docName, nameDoc.current.value]
      };

      setSelectedUser(updatedUser)
    }
    setCss(false);
    nameDoc.current.value = "";
  }
 console.log(selectedUser)
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
                      <p>{val}</p>
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
            <div className="fileAddContainer"></div>
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

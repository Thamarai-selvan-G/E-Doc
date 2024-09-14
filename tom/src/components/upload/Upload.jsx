import "./Upload.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { myReducers } from "../../store/Store";
import { useState } from "react";
const Upload = () => {
  let userDatas = useSelector(function (data) {
    return data.user;
  });
  let dispatch = useDispatch();

  function deleteUser(e) {
    dispatch(myReducers.deleteUser(e))

    if (selectedUser && selectedUser.name == e) {
      setSelectedUser(null)
    }
  }
  console.log(userDatas);

  const [selectedUser, setSelectedUser] = useState(null);
  function userDocs(val) {
    if (!val) {
      setSelectedUser(null)
    } 
    setSelectedUser(val)
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
            <h1> docName :{selectedUser.docName} </h1>
            <h1>fileName : {selectedUser.docFile} </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;

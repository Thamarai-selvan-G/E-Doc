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
  console.log(userDatas);

  return (
    <div>
      <div className="userParent">
        <div className="nameRow">
          {userDatas &&
            userDatas.map((value, index) => {
              return (
                <div className="nameHead" key={index}>
                  <h4>{value.name}</h4>
                  <p>
                    <RiDeleteBin5Fill />
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Upload;

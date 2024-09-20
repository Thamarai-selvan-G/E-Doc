import { useState, useRef } from "react";

const Upload = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [fileCss, setFileCss] = useState(false);
  const chooseRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && selectedUser) {
      let fileUrl = URL.createObjectURL(file);
      let updatedUser = {
        ...selectedUser,
        docFile: [...(selectedUser.docFile || []), fileUrl],
      };
      setSelectedUser(updatedUser);
    }
  };

  // Drag and Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Add visual indication for the drag action (optional)
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Remove visual indication when drag leaves the area (optional)
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file && selectedUser) {
      let fileUrl = URL.createObjectURL(file);
      let updatedUser = {
        ...selectedUser,
        docFile: [...(selectedUser.docFile || []), fileUrl],
      };
      setSelectedUser(updatedUser);
    }
  };

  return (
    <div>
      <div className="fileAddContainer">
        <div
          className="drgaImg"
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: "2px dashed #ccc",
            padding: "20px",
            textAlign: "center",
            cursor: "pointer",
          }}
        >
          <p>Drag & Drop your file here, or click to upload</p>
          <input
            type="file"
            ref={chooseRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
      {selectedUser && selectedUser.docFile && selectedUser.docFile.map((valFile, index) => (
        <div key={index}>
          <img src={valFile} alt="" className="file" />
        </div>
      ))}
    </div>
  );
};

export default Upload;

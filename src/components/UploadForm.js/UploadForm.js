import React, { useState } from "react";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const desiredImageTypes = ["image/jpeg", "image/png"];

  const changeHandler = e => {
    const selectedFile = e.target.files[0];

    if (selectedFile && desiredImageTypes.includes(selectedFile.type)) {
      setFile(e.target.files[0]);
      setError("");
    } else {
      setError("please upload a .jpeg or .png image");
      setFile(null);
    }
  };

  return (
    <form>
      <input type="file" onChange={changeHandler} />

      <div className="output">
        <div className="error">{error}</div>
        <div>{file?.name}</div>
      </div>
    </form>
  );
};

export default UploadForm;

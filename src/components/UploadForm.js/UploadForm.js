import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

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
			<label>
				<input type="file" onChange={changeHandler} />
				<span>+</span>
			</label>

			<div className="output">
				<div className="error">{error}</div>
				<div>{file?.name}</div>
				{file && <ProgressBar file={file} setFile={setFile} />}
			</div>
		</form>
	);
};

export default UploadForm;

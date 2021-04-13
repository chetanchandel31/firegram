import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

const UploadForm = () => {
	const [file, setFile] = useState({ image: null, description: "" });
	const [error, setError] = useState("");
	const [upload, setUpload] = useState(false);
	const desiredImageTypes = ["image/jpeg", "image/png"];

	const changeHandler = ({ target }) => {
		const selectedFile = target.files[0];

		if (selectedFile && desiredImageTypes.includes(selectedFile.type)) {
			setFile(file => ({ ...file, image: target.files[0] }));
			setError("");
		} else {
			setError("please upload a .jpeg or .png image");
			setFile(file => ({ ...file, image: null }));
		}
	};

	const submitHandler = e => {
		e.preventDefault();
		if (!file.image) return;
		setUpload(true);
	};

	return (
		<form onSubmit={submitHandler}>
			<input placeholder="whats on your mind?" onChange={({ target }) => setFile(file => ({ ...file, description: target.value }))} value={file.description} />{" "}
			<br />
			<label>
				<input type="file" onChange={changeHandler} required />
				<span>add an image</span>
			</label>
			<div className="output">
				<div className="error">{error}</div>
				<div>{file?.image?.name}</div>
				{upload && <ProgressBar file={file} setFile={setFile} setUpload={setUpload} />}
			</div>
			<button className="submitBtn" type="submit">
				create post
			</button>
		</form>
	);
};

export default UploadForm;

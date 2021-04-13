import Title from "./components/Title/Title";
import React, { useState } from "react";
import UploadForm from "./components/UploadForm.js/UploadForm";
import ImageGrid from "./components/ImageGrid/ImageGrid";
import Modal from "./components/Modal/Modal";

function App() {
	const [selectedImage, setSelectedImage] = useState("");

	return (
		<div className="App">
			<Title />
			<UploadForm />
			<ImageGrid setSelectedImage={setSelectedImage} />
			{selectedImage && <Modal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />}
		</div>
	);
}

export default App;

import React from "react";

const Modal = ({ selectedImage, setSelectedImage }) => {
	return (
		<div className="backdrop" onClick={() => setSelectedImage("")}>
			<img src={selectedImage} alt="a big pic" />
		</div>
	);
};

export default Modal;

import { motion } from "framer-motion";
import React, { useRef } from "react";

const Modal = ({ selectedImage, setSelectedImage }) => {
	const imageRef = useRef();

	return (
		<motion.div
			className="backdrop"
			onClick={e => {
				if (!imageRef.current.contains(e.target)) setSelectedImage("");
			}}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<motion.img src={selectedImage} ref={imageRef} alt="a big pic" initial={{ y: "-100vh" }} animate={{ y: 0 }} />
		</motion.div>
	);
};

export default Modal;

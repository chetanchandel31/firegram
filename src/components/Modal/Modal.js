import { motion } from "framer-motion";
import React from "react";

const Modal = ({ selectedImage, setSelectedImage }) => {
	return (
		<motion.div className="backdrop" onClick={() => setSelectedImage("")} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
			<motion.img src={selectedImage} alt="a big pic" initial={{ y: "-100vh" }} animate={{ y: 0 }} />
		</motion.div>
	);
};

export default Modal;

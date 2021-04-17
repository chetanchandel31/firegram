import { motion } from "framer-motion";
import React, { useEffect } from "react";
import useStorage from "../../hooks/useStorage";

const ProgressBar = ({ file, setFile, setUpload }) => {
	const { url, progress } = useStorage(file);

	useEffect(() => {
		if (url) {
			setFile({ image: null, description: "" });
			setUpload(false);
		}
	}, [url, setFile, setUpload]);

	return <motion.div className="progress-bar" initial={{ width: 0 }} animate={{ width: progress + "%" }}></motion.div>;
};

export default ProgressBar;

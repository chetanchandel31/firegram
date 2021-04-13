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

	return <div className="progress-bar" style={{ width: progress + "%" }}></div>;
};

export default ProgressBar;

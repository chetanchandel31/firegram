import React from "react";
import useFirestore from "../../hooks/useFirestore";

const ImageGrid = ({ setSelectedImage }) => {
	const { docs } = useFirestore("images");

	return (
		<div className="img-grid">
			{docs?.map(doc => (
				<div className="img-wrap" key={doc.id} onClick={() => setSelectedImage(doc.url)}>
					<img src={doc.url} alt="can't load" />
				</div>
			))}
		</div>
	);
};

export default ImageGrid;

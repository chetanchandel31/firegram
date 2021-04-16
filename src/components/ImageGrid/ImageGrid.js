import React from "react";
import useFirestore from "../../hooks/useFirestore";
import Image from "./Image/Image";

const ImageGrid = ({ setSelectedImage }) => {
	const { docs } = useFirestore("images");

	return (
		<div className="img-grid">
			{docs?.map(doc => (
				<Image key={doc.id} doc={doc} setSelectedImage={setSelectedImage} />
			))}
		</div>
	);
};

export default ImageGrid;

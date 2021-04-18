import React, { useState } from "react";
import useFirestore from "../../hooks/useFirestore";
import EditModal from "./EditModal";
import Image from "./Image/Image";

const ImageGrid = ({ setSelectedImage }) => {
	const { docs } = useFirestore("images");
	const [selectedDoc, setSelectedDoc] = useState(null);

	return (
		<div className="img-grid">
			{docs?.map(doc => (
				<Image key={doc.id} doc={doc} setSelectedImage={setSelectedImage} setSelectedDoc={setSelectedDoc} />
			))}
			{selectedDoc && <EditModal selectedDoc={selectedDoc} setSelectedDoc={setSelectedDoc} />}
		</div>
	);
};

export default ImageGrid;

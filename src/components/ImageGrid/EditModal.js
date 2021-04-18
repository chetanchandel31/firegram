// import { motion } from "framer-motion";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { firestore } from "../../firebase/firebase";

const EditModal = ({ selectedDoc, setSelectedDoc }) => {
	const [newDescription, setNewDescription] = useState(selectedDoc.description);
	const collectionRef = firestore.collection("images");

	const submitHandler = (e, id) => {
		e.preventDefault();
		const description = newDescription;
		collectionRef.doc(id).set({ description }, { merge: true });
		setSelectedDoc(null);
	};

	return (
		<motion.div className="backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
			<div>
				<form onSubmit={e => submitHandler(e, selectedDoc.id)}>
					<span className="editModalDesc">Enter new description:</span>
					<br />
					<input autoFocus value={newDescription} onChange={({ target }) => setNewDescription(target.value)} required />
					<br />
					<button className="editBtn" type="submit">
						save changes
					</button>{" "}
					<button className="editBtn" onClick={() => setSelectedDoc(null)}>
						cancel
					</button>
				</form>
			</div>
		</motion.div>
	);
};

export default EditModal;

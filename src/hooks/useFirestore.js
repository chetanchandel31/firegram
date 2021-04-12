import { useEffect } from "react";
import { useState } from "react";
import { firestore } from "../firebase/firebase";

//how useCollectionData hook might be working internally
const useFirestore = collection => {
	const [docs, setDocs] = useState([]);

	useEffect(() => {
		firestore
			.collection(collection)
			.orderBy("createdAt", "desc")
			.onSnapshot(snap => {
				let documents = [];
				snap.forEach(doc => documents.push({ ...doc, id: doc.id }));
				setDocs(documents);
			});
	}, [collection]);

	return { docs };
};

export default useFirestore;

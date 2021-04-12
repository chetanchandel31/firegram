import { useEffect, useState } from "react";
import { storage } from "../firebase/firebase";

const useStorage = file => {
	const [progress, setProgress] = useState(0);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);

	useEffect(() => {
		//create a ref in "firebase storage" where we will later store an actual image
		const storageRef = storage.ref(file.name);

		//put the actual image in that ref using an asyncronous method
		storageRef.put(file).on(
			"state_changed",
			snapshot => {
				const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				setProgress(percentage);
			},
			err => {
				setError(err);
			},
			async () => {
				//URL of actual image in "firebase storage"
				const url = await storageRef.getDownloadURL();
				setUrl(url);
			}
		);
	}, [file]);

	return { progress, url, error };
};

export default useStorage;

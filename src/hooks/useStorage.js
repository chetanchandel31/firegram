import { useEffect, useState } from "react";
import { auth, firebaseStorage, firestore, serverTimestsamp } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const useStorage = file => {
	const [user] = useAuthState(auth);

	const [progress, setProgress] = useState(0);
	const [error, setError] = useState(null);
	const [url, setUrl] = useState(null);

	useEffect(() => {
		//create a ref in "firebase storage" where we will later store an actual image
		const storageRef = firebaseStorage.ref(`${file?.image?.name}${Date.now()}`);
		const collectionRef = firestore.collection("images");

		//put the actual image in that ref using an asyncronous method
		storageRef.put(file.image).on(
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
				collectionRef.add({
					url,
					createdAt: serverTimestsamp(),
					description: file.description,
					creator: user?.uid,
					userPhotoUrl: user?.photoURL,
					userName: user?.displayName,
					likes: [],
				});
				setUrl(url);
			}
		);
	}, [file, user]);

	return { progress, url, error };
};

export default useStorage;

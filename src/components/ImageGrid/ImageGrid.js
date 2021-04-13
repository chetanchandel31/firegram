import React from "react";
import useFirestore from "../../hooks/useFirestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";

const ImageGrid = ({ setSelectedImage }) => {
	const { docs } = useFirestore("images");
	const [user] = useAuthState(auth);
	const collectionRef = firestore.collection("images");

	const deleteHandler = id => {
		collectionRef.doc(id).delete();
	};

	const likeHandler = (likesArr, id) => {
		let likes = [...likesArr];
		if (likesArr.includes(user.uid)) likes = likes.filter(el => el !== user.uid);
		else likes.push(user.uid);
		collectionRef.doc(id).set({ likes }, { merge: true });
	};

	return (
		<div className="img-grid">
			{docs?.map(doc => (
				<div key={doc.id} className="post">
					<div className="postHeader">
						<img src={doc.userPhotoUrl} className="userDp" alt="dp" />
						<strong>{doc?.userName}</strong>
					</div>
					<div className="img-wrap" onClick={() => setSelectedImage(doc.url)}>
						<img src={doc.url} alt="can't load" />
					</div>
					<div className="likeAndDeleteBar">
						<button className="likeBtn" disabled={!user} onClick={() => likeHandler(doc.likes, doc.id)}>
							like
						</button>
						{doc?.likes?.length}
						<span></span>
						{user?.uid === doc.creator && (
							<button className="deleteBtn" onClick={() => deleteHandler(doc.id)}>
								delete
							</button>
						)}
					</div>
					<div className="postDesc">
						<strong>{doc.userName}</strong> {doc?.description}
					</div>
				</div>
			))}
		</div>
	);
};

export default ImageGrid;

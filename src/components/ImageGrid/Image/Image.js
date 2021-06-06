import { motion } from "framer-motion";
import moment from "moment";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firebaseStorage, firestore } from "../../../firebase/firebase";

const Image = ({ doc, setSelectedImage, setSelectedDoc }) => {
	const [user] = useAuthState(auth);
	const collectionRef = firestore.collection("images");
	const storageRef = firebaseStorage.refFromURL(doc.url);

	const deleteHandler = id => {
		if (window.confirm("Are you sure you want to delete this post?")) {
			collectionRef.doc(id).delete();
			storageRef.delete();
		}
	};

	const likeHandler = (likesArr, id) => {
		let likes = [...likesArr];
		if (likesArr.includes(user.uid)) likes = likes.filter(el => el !== user.uid);
		else likes.push(user.uid);
		collectionRef.doc(id).set({ likes }, { merge: true });
	};

	const likeBtnClassname = doc.likes.includes(user?.uid) ? "likedBtn" : "likeBtn";

	const additionalLikeBtnStyle = () => {
		if (user) return null;
		return { opacity: "0.5" };
	};

	return (
		<motion.div
			className="post"
			layout //post animates to new position without delay
			initial="hidden"
			animate="visible"
			variants={{
				hidden: {
					opacity: 0,
				},
				visible: {
					opacity: 1,
					transition: {
						delay: 1, //but from hidden to visible there is a delay
					},
				},
			}}
		>
			<div className="postHeader">
				<img src={doc.userPhotoUrl} className="userDp" alt="dp" />
				<strong>{doc?.userName}</strong>
				<span></span>
				{user?.uid === doc.creator && (
					<button className="editBtn" onClick={() => setSelectedDoc(doc)}>
						edit
					</button>
				)}
			</div>
			<motion.div className="img-wrap" onClick={() => setSelectedImage(doc.url)} whileHover={{ opacity: 1 }}>
				<img src={doc.url} alt="can't load" />
			</motion.div>
			<div className="likeAndDeleteBar">
				<span className="likeContainer">
					<button className={likeBtnClassname} style={additionalLikeBtnStyle()} disabled={!user} onClick={() => likeHandler(doc.likes, doc.id)}>
						like
					</button>
					{doc?.likes?.length}
				</span>

				{user?.uid === doc.creator && (
					<button className="deleteBtn" onClick={() => deleteHandler(doc.id)}>
						delete
					</button>
				)}
			</div>
			<div className="postDesc">
				<strong>{doc.userName}</strong> {doc?.description}
			</div>
			<small>{moment(doc.createdAt?.toDate()).fromNow()}</small>
		</motion.div>
	);
};

export default Image;

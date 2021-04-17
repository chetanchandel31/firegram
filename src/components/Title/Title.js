import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase, { auth } from "../../firebase/firebase";

const Title = () => {
	const [user] = useAuthState(auth);
	console.log(auth.currentUser);

	const authHandler = () => {
		if (user) auth.signOut();
		else auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	};

	const dummySigninHandler = () => {
		auth.signInWithEmailAndPassword("abc@def.com", "12341234");
	};

	// const updateUser = () => {
	// 	auth.currentUser.updateProfile({
	// 		displayName: "dummy user",
	// 		photoURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsmsT0Mla29mAwNqzAWyLjRBX3xsZFKue7ig&usqp=CAU",
	// 	});
	// };
	// updateUser();

	return (
		<div className="title">
			<div className="header">
				{user && <img src={user.photoURL} alt="dp" />}
				<button onClick={authHandler}>{user ? "logout" : "google sign in"}</button> {!user && <button onClick={dummySigninHandler}>dummy sign in</button>}
			</div>
			<h1>FireGram</h1>
			{!user && <p>You can sign in with google to create posts and like other's posts</p>}
		</div>
	);
};

export default Title;

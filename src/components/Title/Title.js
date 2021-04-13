import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase, { auth } from "../../firebase/firebase";

const Title = () => {
	const [user] = useAuthState(auth);
	console.log(user);

	const authHandler = () => {
		if (user) auth.signOut();
		else auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	};

	return (
		<div className="title">
			<div className="header">
				{user && <img src={user.photoURL} alt="dp" />}
				<button onClick={authHandler}>{user ? "logout" : "google sign in"}</button>
			</div>
			<h1>FireGram</h1>
			<h2>Your Pictures</h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
		</div>
	);
};

export default Title;

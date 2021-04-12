import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/storage";

firebase.initializeApp({
	apiKey: "AIzaSyAICMFR20NkzGBhGb9A5xSXM2ejhwzFMCE",
	authDomain: "firegram-151b3.firebaseapp.com",
	projectId: "firegram-151b3",
	storageBucket: "firegram-151b3.appspot.com",
	messagingSenderId: "314364107726",
	appId: "1:314364107726:web:f8106d1b6589b939f4299f",
});

export const firestore = firebase.firestore();
export const storage = firebase.storage();

export default firebase;

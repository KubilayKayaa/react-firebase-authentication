import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCXEINglkY2jUQAqeRAQG6MPXMxE697T5k",
  authDomain: "basic-auth-todo-dc6f9.firebaseapp.com",
  projectId: "basic-auth-todo-dc6f9",
  storageBucket: "basic-auth-todo-dc6f9.appspot.com",
  messagingSenderId: "477148459312",
  appId: "1:477148459312:web:fbc828d0815161fa9d58f5",
  measurementId: "G-BKL44T2HXY",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

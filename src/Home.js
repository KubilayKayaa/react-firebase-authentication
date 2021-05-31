import React, { useState, useEffect } from "react";
import AddPost from "./AddPost";
import Navbar from "./Navbar";
import Posts from "./Posts";
import firebase from "./firebase";

function Home() {
  const [currentUser, setCurrentUser] = useState("");
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setCurrentUser(user.uid);
    }
  });
  return (
    <div>
      <Navbar />
      {currentUser ? (
        <AddPost />
      ) : (
        <h1 style={{ marginTop: "92px", textAlign: "center" }}>
          Giriş Yapmalısınız.
        </h1>
      )}
      <Posts />
    </div>
  );
}

export default Home;

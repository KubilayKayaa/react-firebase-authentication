import React, { useState, useEffect } from "react";
import Post from "./Post";
import firebase from "./firebase";

function Posts() {
  const [data, setData] = useState([]);
  const [currentID, setCurrentID] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const postRef = firebase.database().ref(`users/${user.uid}/posts`);
        postRef.on("value", (snapshot) => {
          let newPost = [];
          snapshot.forEach((data) => {
            newPost.push({ key: data.key, results: data.val() });
          });
          setData(newPost);
        });
        setCurrentID(user.uid);
      }
    });
  }, []);

  return (
    <div className="posts">
      {currentID && <h2>All Posts</h2>}
      {data &&
        data.map((item, index) => {
          return (
            <Post
              key={index}
              title={item.results.title}
              text={item.results.text}
              data_key={item.key}
              current_ID={currentID}
            />
          );
        })}
    </div>
  );
}

export default Posts;

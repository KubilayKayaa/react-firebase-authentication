import React, { useState } from "react";
import firebase from "./firebase";

function AddPost() {
  const [addText, setAddText] = useState("");
  const [addTitle, setAddTitle] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  const sendPost = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (addText !== "" && addTitle !== "") {
          firebase
            .database()
            .ref()
            .child("users")
            .child(user.uid)
            .child("posts")
            .push({
              title: addTitle,
              text: addText,
            });
          setErrorText("");
          setAddTitle("");
          setAddText("");
        } else {
          setErrorText("Empty!");
          setError(true);
        }
      }
    });
  };

  return (
    <div className="add-post">
      <h3>Add Post</h3>
      <input
        type="text"
        onChange={(e) => setAddTitle(e.target.value)}
        placeholder="Title..."
        value={addTitle}
        autoFocus
      />
      <input
        type="text"
        onChange={(e) => setAddText(e.target.value)}
        placeholder="Text..."
        value={addText}
      />
      <button onClick={sendPost} className="add-post-btn">
        Add
      </button>
      {errorText && (
        <p className={error === true ? "error-message" : "data-message"}>
          {errorText}
        </p>
      )}
    </div>
  );
}

export default AddPost;

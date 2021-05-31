import React, { useState } from "react";
import { AiOutlineDelete, AiFillEdit } from "react-icons/ai";
import Modal from "react-modal";
import { RiCloseLine } from "react-icons/ri";
import firebase from "./firebase";
import PostUpdate from "./PostUpdate";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";

function Post({ title, text, data_key, current_ID }) {
  const [showModal, setShowModal] = useState(false);
  const [addTitle, setAddTitle] = useState(title);
  const [addText, setAddText] = useState(text);

  const deleteItem = () => {
    firebase
      .database()
      .ref(`users/${current_ID}`)
      .child("posts")
      .child(data_key)
      .remove();
  };

  const updateItem = () => {
    if (addTitle === "" && addText === "") {
      alert("boş bırakılamaz");
    } else {
      firebase
        .database()
        .ref(`users/${current_ID}`)
        .child("posts")
        .child(data_key)
        .set({
          title: addTitle,
          text: addText,
        });
      setShowModal(false);
    }
  };

  return (
    <div className="post">
      <AiFillEdit
        onClick={() => setShowModal(true)}
        className="post-edit-button"
        size="20"
      />
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        ariaHideApp={false}
        contentLabel="Selected Option"
      >
        <div className="content">
          <input
            type="text"
            onChange={(e) => setAddTitle(e.target.value)}
            placeholder={title}
            value={addTitle}
          />
          <input
            type="text"
            onChange={(e) => setAddText(e.target.value)}
            placeholder={text}
            value={addText}
          />
          <button type="button" onClick={updateItem}>
            Update
          </button>
        </div>
        <button onClick={() => setShowModal(false)} className="close-button">
          <RiCloseLine color="#000" size="24" />
        </button>
      </Modal>
      <Link to={`/postdetail/&currentid=${current_ID}&data_key=${data_key}`}>
        <h3>{title}</h3>
      </Link>
      <p className="text">{text}</p>
      <AiOutlineDelete className="post-delete" size="20" onClick={deleteItem} />
    </div>
  );
}

export default Post;

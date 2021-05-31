import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { RiCloseLine } from "react-icons/ri";
import firebase from "./firebase";

function PostUpdate() {
  const [showModal, setShowModal] = useState(false);
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={() => setShowModal(false)}
      contentLabel="Selected Option"
    >
      <div className="content">
        <input type="text" placeholder="Kullanıcı Adı" />
        <input type="password" placeholder="Şifre" />
        <button type="button">Kayıt Ol</button>
      </div>
      <button onClick={() => setShowModal(false)} className="close-button">
        <RiCloseLine color="#000" size="24" />
      </button>
    </Modal>
  );
}

export default PostUpdate;

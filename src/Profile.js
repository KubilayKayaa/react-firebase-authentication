import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import firebase from "./firebase";
import { withRouter } from "react-router-dom";

function Profile() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isForgot, setIsForgot] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setEmail(user.email);
      }
    });
  }, []);

  const updateEmail = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user
          .updateEmail(email)
          .then(() => {
            setIsForgot(true);
            setErrorMessage("E-Mail Updated!");
          })
          .catch((err) => {
            setErrorMessage(err.message);
            setIsForgot(false);
          });
      }
    });
  };
  return (
    <div>
      <Navbar />
      <div className="profile">
        <h2>Profile</h2>
        <div className="profile-section">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {errorMessage && (
            <p
              className={isForgot === false ? "error-message" : "data-message"}
            >
              {errorMessage}
            </p>
          )}
        </div>
        <button className="profile-edit" onClick={updateEmail}>
          Edit
        </button>
      </div>
    </div>
  );
}

export default withRouter(Profile);

import React, { useState } from "react";
import firebase from "./firebase";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [forgotPassword, setForgotPassword] = useState("");
  const [isForgot, setIsForgot] = useState(false);

  const inputPressEnter = (e) => {
    if (e.key === "Enter") {
      rst();
      setEmail("s");
    }
  };
  const rst = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        setForgotPassword("Check your Inbox, please.");
        setIsForgot(true);
      })
      .catch((err) => {
        setForgotPassword(err.message);
        setIsForgot(false);
      });
  };
  return (
    <div>
      <Navbar />
      <div className="form-items">
        {isForgot === false ? (
          <>
            <p>Reset Password</p>
            <input
              type="text"
              placeholder="Email..."
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={inputPressEnter}
            />

            <button onClick={rst}>Reset Password</button>
          </>
        ) : (
          <Link to={"/login"} className="form-item-redirect">
            Login
          </Link>
        )}

        {forgotPassword && (
          <p className={isForgot === false ? "error-message" : "data-message"}>
            {forgotPassword}
          </p>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;

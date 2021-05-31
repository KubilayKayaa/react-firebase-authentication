import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import firebase from "./firebase";
import Navbar from "./Navbar";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerError, setRegisterError] = useState("");

  const inputPressEnter = (e) => {
    if (e.key === "Enter") {
      register();
    }
  };

  const register = () => {
    if ((email !== "") & (password !== "")) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => (window.location.href = "/profile"));
        })
        .catch((err) => setRegisterError(err.message));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-items">
        <p>Register</p>
        <input
          type="text"
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={inputPressEnter}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={inputPressEnter}
        />
        <button onClick={register}>Register</button>
        <Link to={"/login"} className="form-item-redirect">
          Already have an account?
        </Link>
        {registerError && <p className="error-message">{registerError}</p>}
      </div>
    </div>
  );
}

export default Register;

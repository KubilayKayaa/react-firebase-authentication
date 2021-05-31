import React, { useState } from "react";
import firebase from "./firebase";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const inputPressEnter = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  const login = () => {
    if ((email !== "") & (password !== "")) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => (window.location.href = "/"))
        .catch((err) => {
          setLoginError(err.message);
        });
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-items">
        <p>Login</p>
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
        <button onClick={login}>Login</button>
        <Link to={"/register"} className="form-item-redirect">
          Don't you have an accout?
        </Link>
        <Link to={"/forgotpassword"} className="form-item-redirect">
          Forgot Password?
        </Link>
        {loginError && <p className="error-message">{loginError}</p>}
      </div>
    </div>
  );
}

export default Login;

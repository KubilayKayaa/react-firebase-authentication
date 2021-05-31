import React, { useState } from "react";
import { Link } from "react-router-dom";
import firebase from "./firebase";

function Navbar() {
  const [email, setEmail] = useState("");

  const signOut = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            window.location.href = "/login";
          })
          .catch((err) => alert(err.message));
      }
    });
  };
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      setEmail(user.email);
    }
  });
  return (
    <div>
      <div className="navbar">
        <Link to={"/"} className="navbar-logo">
          Home
        </Link>

        <div className="navbar-menu">
          {email === "" ? (
            <div>
              <Link to={"/register"}>Register</Link>
              <Link to={"/login"}>Login</Link>
            </div>
          ) : (
            <div className="navbar-user">
              <Link to={`/profile/${email}`}>{email}</Link>
              <button onClick={signOut}>Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;

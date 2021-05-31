import React, { useEffect, useState } from "react";
import "./App.css";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";
import PostDetail from "./PostDetail";
import firebase from "./firebase";

function App() {
  const [user, setUser] = useState("");
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/profile/:email" component={Profile} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route
            path="/postdetail/:currentid:data_key"
            component={PostDetail}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

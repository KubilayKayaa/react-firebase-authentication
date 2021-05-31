import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import Navbar from "./Navbar";
import "./App.css";
import { useParams, useRouteMatch, useLocation } from "react-router-dom";

function PostDetail() {
  const [data, setData] = useState([]);

  const queryStr = window.location.href;
  const usp = new URLSearchParams(queryStr);
  usp.toString();
  const data_key_URL = usp.get("data_key");
  const current_ID_URL = usp.get("currentid");

  useEffect(() => {
    firebase
      .database()
      .ref(`users/${current_ID_URL}`)
      .child("posts")
      .child(data_key_URL)
      .on("value", (snapshot) => {
        setData(snapshot.val());
      });
  }, []);
  let { data_key, currentid } = useParams();

  return (
    <div>
      <Navbar />
      {data && (
        <div className="post" style={{ marginTop: "92px" }}>
          <h3>{data.title}</h3>
          <p className="text">{data.text}</p>
        </div>
      )}
    </div>
  );
}

export default PostDetail;

import * as client from "./client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

function Signin() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      navigate("/profile");
    } catch (err) {
        setError(err.response.data.message);
    }
  };
  return (
    <div style={{paddingLeft: 15}}>
      <h1>Signin</h1>
      {error && <div>{error}</div>}
      <input className="form-control" placeholder="username" value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}/>
      <input className="form-control" placeholder="password" type="password" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}/>
      <button className="btn btn-primary" onClick={signin}> Signin </button>
    </div>
  );
}
export default Signin;
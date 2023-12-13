import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";

function Signup() {
    const [error, setError] = useState("");
    const [credentials, setCredentials] = useState({
        username: "", password: "", firstName: "", lastname: ""
    });
    const navigate = useNavigate();
    const signup = async () => {
        try {
            await client.signup(credentials);
            navigate("/loggedin");
        } catch (err) {
            setError(err.response.data.message);
        }
    };
    return (
        <div style={{ paddingLeft: 15 }}>
            <h1>Signup</h1>
            {error && <div>{error}</div>}
            <input className="form-control"
                value={credentials.username} placeholder="username"
                onChange={(e) => setCredentials({
                    ...credentials,
                    username: e.target.value
                })} />
            <input className="form-control" placeholder="password"
                value={credentials.password}
                onChange={(e) => setCredentials({
                    ...credentials,
                    password: e.target.value
                })} />
            <input className="form-control" placeholder="First Name"
                value={credentials.firstName}
                onChange={(e) => setCredentials({
                    ...credentials,
                    firstName: e.target.value
                })} />
            <input className="form-control" placeholder="Last Name"
                value={credentials.lastname}
                onChange={(e) => setCredentials({
                    ...credentials,
                    lastname: e.target.value
                })} />
            <button onClick={signup} className="btn btn-primary">
                Signup
            </button>
        </div>
    );
}
export default Signup;
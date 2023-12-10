import * as client from "./client";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UserDetails() {
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchCurrentUser = async () => {
        const user = await client.account();
        setCurrentUser(user);
      };

    const fetchUser = async () => {
        const user = await client.findUserById(id);
        setUser(user);
    };

    useEffect(() => {
        fetchUser();
        fetchCurrentUser();
      }, [id]);
    return (
        <div>
        {!currentUser && 
        (<div>
            <h1>Please Sign in to access profile</h1>
            <button type="button" className="btn btn-primary" onClick={() => navigate("/login")}> Sign in </button>
            </div>)
            }
        {currentUser && (
        <div>
            <div className="profile-main">
                <h1>User: {user.username}</h1>
                <div className="d-flex">
                    <div className="following-section">
                        <h5>Following</h5>
                    </div>
                    <div className="following-section">
                        <h5>Followers</h5>
                    </div>
                </div>

                <div className="bio-section">
                    <h2>A litle bit about me </h2>
                    <p>{user.bio} </p>
                </div>
                <div className="bio-section">
                    <h2>My countries of origin are...</h2>
                </div>
                <div className="bio-section">
                    <h2>I want to travel to ... </h2>
                </div>
                <div className="bio-section">
                    <h2>I have traveled to ... </h2>
                </div>
            </div>
            
        </div>
        )}
    </div>
    )
    
}

export default UserDetails;
import React from "react";
import { Link } from "react-router-dom";
import Nav from "../Nav";
import "./index.css";

function Profile() {
    return (
        <div>
            <Nav />
            <div>
                <Link to={`/Profile/Edit_Profile`}><button type="button" className="btn btn-primary float-end" > Edit Profile </button> </Link>
                <button type="button" className="btn btn-danger float-end" > Sign out </button>
                <div className="profile-main">
                    <h1>This will be where users can put a profile picture</h1>
                    <h1>USERNAME's profile</h1>
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
                        <p>This will be where they put in bio information other than the statements below </p>
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
        </div>
    );
}

export default Profile;
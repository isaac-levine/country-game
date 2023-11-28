import React from "react";
import "./index.css";
import Nav from "../Nav";

function Profile() {
    return (
        <div>
            <button type="button" className="btn btn-primary float-end" > Edit Profile </button>
            <button type="button" className="btn btn-danger float-end" > Sign out </button>
            <Nav/>
            <input type="text" className="form-control" placeholder="Search for countries/users" />
            <hr />
            <div className="profile-main-div">
                <h1>This will be where users can put a profile picture</h1>
                <h1>USERNAME's profile</h1>

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
    );
}

export default Profile;

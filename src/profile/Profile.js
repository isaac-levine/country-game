import * as client from "../Users/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./index.css";

function Profile() {
    const [account, setAccount] = useState(null);
    const navigate = useNavigate();

    const signout = async () => {
        await client.signout();
        navigate("/welcome");
    };

    const fetchAccount = async () => {
        const account = await client.account();
        setAccount(account);
    };
    useEffect(() => {
        fetchAccount();
    }, []);

    return (
        <div>
            {account && (
            <div>
                <Link to={`/Profile/Edit_Profile`}><button type="button" className="btn btn-primary float-end" > Edit Profile </button> </Link>
                <button type="button" className="btn btn-danger float-end" onClick={signout} > Sign out </button>
                <div className="profile-main">
                    <h1>User: {account.username}</h1>
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
            )};
        </div>
    );
}

export default Profile;
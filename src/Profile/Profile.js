import * as client from "../Users/client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import * as followsClient from "../follows/client";
import { setCurrentUser } from "../Users/reducer";
import { useDispatch } from "react-redux";

import "./index.css";

function Profile() {
    const { id } = useParams();
    const [account, setAccount] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signout = async () => {
        await client.signout();
        dispatch(setCurrentUser(null));
        navigate("/welcome");
    };

    const findUserById = async (id) => {
        const user = await client.findUserById(id);
        setAccount(user);
    };

    const fetchAccount = async () => {
        const account = await client.account();
        fetchFollowing(account._id);
        fetchFollowers(account._id);
        setAccount(account);
    };

    const fetchFollowers = async (id) => {
        if (!account) {
            return;
        }
        const followers = await followsClient.findUsersFollowingUser(id);
        setFollowers(followers);
    };

    const fetchFollowing = async (id) => {
        if (!account) {
            return;
        }
        const following = await followsClient.findUsersFollowedByUser(id);
        setFollowing(following);
    };

    useEffect(() => {
        if (id) {
            findUserById(id);
        } else {
            fetchAccount();
        }
    }, []);
    return (
        <div>
            {!account &&
                (<div>
                    <h1>Please Sign in to access profile</h1>
                    <button type="button" className="btn btn-primary" onClick={() => navigate("/login")}> Sign in </button>
                </div>)
            }
            {account && (
                <div>
                    <Link to={`/Friends`}><button type="button" className="btn btn-success float-end" > Find Friends </button> </Link>
                    <Link to={`/Profile/Edit_Profile`}><button type="button" className="btn btn-primary float-end" > Edit Profile </button> </Link>
                    <button type="button" className="btn btn-danger float-end" onClick={signout} > Sign out </button>
                    <div className="profile-main">
                        <h1>User: {account.username}</h1>
                        <div className="d-flex">
                            <div className="following-section">
                                <h5>Following</h5>
                                {following.length}
                            </div>
                            <div className="following-section">
                                <h5>Followers</h5>
                                {followers.length}
                            </div>
                        </div>

                        <div className="bio-section">
                            <h2>A litle bit about me </h2>
                            <p>{account.bio} </p>
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
    );
}

export default Profile;
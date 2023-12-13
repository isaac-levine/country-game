import * as client from "../Users/client";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as followsClient from "../follows/client";

import "./index.css";

function OtherUsers() {
    const { id } = useParams();
    const [account, setAccount] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    const fetchCurrentUser = async () => {
        const user = await client.account();
        setCurrentUser(user);
    };
   
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);


    const fetchUser = async () => {
        const user = await client.findUserById(id);
        setAccount(user);
        fetchFollowers(user._id);
        fetchFollowing(user._id);
    };


    const follow = async () => {
        if (currentUser.status === "PRO") {
            await followsClient.createUserFollowsUser(currentUser._id, account._id);
            await followsClient.createUserFollowsUser(account._id, currentUser._id);
        } else {
            await followsClient.createUserFollowsUser(currentUser._id, account._id); 
        }
        
    };

    const fetchFollowers = async (id) => {
        const followers = await followsClient.findUsersFollowingUser(id);
        setFollowers(followers);
    };

    const fetchFollowing = async (id) => {
        const following = await followsClient.findUsersFollowedByUser(id);
        setFollowing(following);
    };

    const alreadyFollowing = () => {
        {console.log(currentUser?._id)}
        
        return followers.find((follows) => follows.follower._id === currentUser._id);
    };

    useEffect(() => {
        fetchUser();
        fetchCurrentUser();

    }, [id]);

    return (
        <div>
            
            {currentUser?._id !== id && (
                <>
                    {alreadyFollowing() ? (
                        <button className="btn btn-danger float-end">Following</button>
                    ) : (
                        <button onClick={follow} className="btn btn-primary float-end">
                            Follow
                        </button>
                    )}
                </>
            )}
            {account && (
                <div>
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

export default OtherUsers;
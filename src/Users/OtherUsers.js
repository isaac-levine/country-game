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
        try {
            const user = await client.account();
            setCurrentUser(user);
        } catch (error) {
            console.log('[error]', error.response);
        }
    };

    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);


    const fetchUser = async () => {
        try {
            const user = await client.findUserById(id);
            setAccount(user);
            fetchFollowers(user._id);
            fetchFollowing(user._id);
        } catch
        (error) {
            console.log('[error]', error.response);
        }
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
        try {
            const followers = await followsClient.findUsersFollowingUser(id);
            setFollowers(followers);
        }
        catch (error) {
            console.log('[error]', error.response);
        }
    };

    const fetchFollowing = async (id) => {
        try {
            const following = await followsClient.findUsersFollowedByUser(id);
            setFollowing(following);
        } catch (error) {
            console.log('[error]', error.response);
        }
    };

    const alreadyFollowing = () => {
        try {
            return followers.find((follows) => follows.follower._id === currentUser._id);
        }
        catch (error) {
            console.log('[error]', error.response);
        }
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
                        {currentUser?._id && (
                            <div>
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
                        )}
                    </div>

                </div>
            )}
        </div>
    );
}

export default OtherUsers;
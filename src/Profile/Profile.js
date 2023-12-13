import * as client from "../Users/client";
import { useState} from "react";
import { useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import * as followsClient from "../follows/client";
import * as likesClient from "../likes/client";

import "./index.css";

function Profile() {
    const [account, setAccount] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [likes, setLikes] = useState([]);
    const navigate = useNavigate();

    const signout = async () => {
        await client.signout();
        navigate("/welcome");
    };

    const fetchUser = async () => {
        try {
            const user = await client.account();
            setAccount(user);
            fetchFollowing(user._id);
            fetchFollowers(user._id);
        } catch (error) {
            console.log('[error]', error.response);
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

    const fetchCountryLikes = async (id) => {
        const likes = await likesClient.findUsersWhoLikeAlbum(id);
        setLikes(likes);
    };

    useState(() => {
        fetchUser();
    }, []);
    return (
        <div>
            {!account &&
                <div className="restrict_from_none_sign_in">
                    <h2>Please sign in to see your profile or sign up</h2>
                    <Link to={`/Login`}>
                        <button type="button" className="btn btn-primary"> Sign in </button>
                    </Link>
                    <Link to={`/signup`}>
                        <button type="button" className="btn btn-primary"> Sign Up </button>
                    </Link>
                </div>
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
                            <p>{account.origins}</p>
                        </div>
                        <h2>I want to travel to</h2>
                        <div className="bio-section">
                            <div className="list-group">
                                {likes.map((like) => (
                                    <p2>like</p2>
                                ))}
                                </div>
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
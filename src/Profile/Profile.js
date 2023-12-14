import * as client from "../Users/client";
import { useState} from "react";
import { useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import * as followsClient from "../follows/client";
import * as likesClient from "../Likes/client";
import { setCurrentUser } from "../Users/reducer";
import { useDispatch } from "react-redux";
import * as gameClient from "../Play/client";

import "./index.css";

function Profile() {
    const [account, setAccount] = useState(null);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [likes, setLikes] = useState([]);
    const [recentUserScores, setRecentUserScores] = useState([]);
    const [averageScore, setAverageScore] = useState(0);
    const navigate = useNavigate();

    const signout = async () => {
        await client.signout();
        navigate("/welcome");
    };

    const fetchUser = async () => {
        try {
            const account = await client.account();
            fetchFollowing(account._id);
            fetchFollowers(account._id);
            setAccount(account);
            fetchUserScores(account.username);
            fetchAverageScore(account.username);
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

    const fetchUserScores = async (username) => {
        try {
          console.log("fetching data for " + username);
          const recentUserScores = await gameClient.GetRecentUserScores(username);
          setRecentUserScores(recentUserScores);
          console.log(recentUserScores);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    
    const fetchAverageScore = async (username) => {
        try {
            const averageScore = await gameClient.GetAverageScore(username);
            setAverageScore(averageScore);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const fetchCountryLikes = async (id) => {
        const likes = await likesClient.findUsersWhoLikeAlbum(id);
        setLikes(likes);
    }

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
                    {account.status == "ADMIN" && (<Link to={`/EditOthers/${account._id}`}><button type="button" className="btn btn-primary float-end" > Edit other users </button> </Link>)}
                    <Link to={`/Profile/Edit_Profile`}><button type="button" className="btn btn-primary float-end" > Edit Profile </button> </Link>
                    <button type="button" className="btn btn-primary float-end" onClick={signout} > Sign out </button>
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
                            <h2>A little bit about me </h2>
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
                        <div>
                            <h2>My recent scores</h2>
                            {recentUserScores && recentUserScores.map((score, index) => (
                                <div key={index}>
                                    {index + 1}. {score.pts} pts
                                </div>
                            ))}
                            Average: {averageScore}
                            </div>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Profile;
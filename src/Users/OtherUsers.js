import * as client from "../Users/client";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import * as followsClient from "../follows/client";
import * as likesClient from "../Likes/client";
import * as gameClient from "../Play/client";

import "./index.css";

function OtherUsers() {
    const { id } = useParams();
    const [account, setAccount] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [traveledTo, setTraveledTo] = useState([]);
    const [onBucketList, setOnBucketList] = useState([]);
    const [recentUserScores, setRecentUserScores] = useState([]);
    const [averageScore, setAverageScore] = useState(0);
    const [gamesPlayed, setGamesPlayed] = useState(0);
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
            fetchUserScores(user.username);
            fetchAverageScore(user.username);
            fetchTraveledToAndBucketList(user._id);
            fetchGamesPlayed(user.username);
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

    const fetchTraveledToAndBucketList = async (id) => {
        const traveledTo = await likesClient.getTraveledToByUser(id);
        const onBucketList = await likesClient.getOnBucketListByUser(id);
        setTraveledTo(traveledTo);
        setOnBucketList(onBucketList);
    };

    const fetchGamesPlayed = async (username) => {
        try {
            //console.log("games played: " + gamesPlayed);
            const gamesPlayed = await gameClient.GetNumGamesPlayed(username);
            setGamesPlayed(gamesPlayed);
            
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

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
                                    <h2>A little bit about me </h2>
                                    <p>{account.bio} </p>
                                </div>
                                <div className="bio-section">
                                    <h2>My countries of origin are...</h2>
                                    <p>{account.origins}</p>
                                </div>
                                <div className="bio-section">
                                    <h2>I have to travelled to ... </h2>
                                    <div className="list-group">
                                {traveledTo && traveledTo.map((country, index) => (
                                    <Link to={`/Details/${country.countryCode}`} className="list-group-item list-group-item-action" key={index}>
                                        {country.countryName}
                                    </Link>
                                ))}
                                </div>
                                </div>
                                <div className="bio-section">
                                <h2>On my Bucket List</h2>
                            <div className="list-group">
                            {onBucketList && onBucketList.map((country, index) => ( 
                                    <Link to={`/Details/${country.countryCode}`} className="list-group-item list-group-item-action" key={index}>
                                        {country.countryName}
                                    </Link>
                             ))}
                        </div>
                                </div>
                                <div className="bio-section">
                            <h2>My recent scores</h2>
                            {recentUserScores && recentUserScores.map((score, index) => (
                                <div key={index}>
                                    {index + 1}. {score.pts} pts
                                </div>
                            ))}
                            Average: {averageScore} <br/> 
                            Games Played: {gamesPlayed}
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
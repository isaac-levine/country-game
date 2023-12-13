import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons";
import SmallSearchBar from "../Search/small-search-bar";
import * as client from "../Users/client.js";
import * as gameClient from "../Play/client.js";

function LoggedInHome() {
  const [account, setAccount] = useState(null);
  const [top5Scores, setTop5Scores] = useState([]);
  const [recentUserScores, setRecentUserScores] = useState([]);
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
    await fetchUserScores();
  };
  const fetchData = async () => {
    try {
      console.log("fetching data");
      const top5Scores = await gameClient.GetTopScorers();
      setTop5Scores(top5Scores);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchUserScores = async () => {
    try {
      console.log("fetching data");
      const recentUserScores = await gameClient.GetRecentUserScores(account.username);
      setRecentUserScores(recentUserScores);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
        fetchData();
        fetchAccount();
  }, []);
  const userFlag = "🇺🇸"; // replace with user's actual flag
  return (
    <div>
      <div className="d-flex">
        <Link to="/Profile/" className="btn btn-primary" role="button">
          {/* <PersonCircle size={30} className="mr-3" /> */}
          My Profile
        </Link>
      </div>

      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1 className="mb-5">
          {account && <p>Welcome, {account.username}! {userFlag}</p>}
        </h1>
        <div className="d-flex flex-column align-items-center">
          <Link to="/Play" className="btn btn-primary btn-lg mb-3" role="button">
            Play Game
          </Link>
          {/* <a href="#" className="btn btn-dark btn-lg mb-3" role="button">
            🏆 View Leaderboards
          </a> */}
          <div className="row">
            <div className="col-6"> 
          Highest Scorers: 
          {top5Scores.map((score, index) => (
            <div key={index}>
              {index + 1}. {score.username} - {score.score} pts
            </div>
          ))}
          </div>
          <div className="col-6">
          Your Recent scores:
          {recentUserScores.map((score, index) => (
            <div key={index}>
              {index + 1}. {score.username} - {score.score} pts
            </div>
          ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoggedInHome;

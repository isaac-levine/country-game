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
    console.log(account);
    await fetchUserScores(account.username);
  };
  const fetchData = async () => {
    try {
      const top5Scores = await gameClient.GetTopScorers();
      setTop5Scores(top5Scores);
    } catch (error) {
      console.error("Error fetching data:", error);
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
  useEffect(() => {
        fetchData();
        fetchAccount();
  }, []);
  //const userFlag = "🇺🇸"; // replace with user's actual flag
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
          {account && <p>Welcome, {account.username}! </p>}
        </h1>
        <div className="d-flex flex-column align-items-center">
          <Link to="/Play" className="btn btn-primary btn-lg mb-3" role="button">
            Play Game
          </Link>
          {/* <a href="#" className="btn btn-dark btn-lg mb-3" role="button">
            🏆 View Leaderboards
          </a> */}
      <div className="row">
  <div className="col-5">
    <h3 className="mb-3">Highest Scorers:</h3>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Username</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        {top5Scores.map((score, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{score.username}</td>
            <td>{score.score} pts</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  <div className="col-md-5">
    <h3 className="mb-3">Your Recent Scores:</h3>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Score</th>
        </tr>
      </thead>
      <tbody>
        {recentUserScores && recentUserScores.map((score, index) => (
          <tr key={index}>
            <th scope="row">{index + 1}</th>
            <td>{score.pts} pts</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    
  </div>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center pt-4">
              <h4>Calling all Geography and Travel Enthusiasts!</h4>
              <p className="col-6 text-center">
                This is a game where you can test your knowledge of countries. You can also learn about countries you have never
                heard of before and share which countries you've traveled to or are on your bucket list</p>
            </div>
    </div>
  );
}

export default LoggedInHome;

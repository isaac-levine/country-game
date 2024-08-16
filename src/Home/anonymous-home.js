import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as client from "../Play/client.js";
import * as userClient from "../Users/client.js";
import LoggedInHome from "./logged-in-home.js";

function AnonymousHome() {
  const [top5Scores, setTop5Scores] = useState([]);
  const [account, setAccount] = useState(null);

  const fetchUser = async () => {
    try {
      const account = await userClient.account();
      setAccount(account);
    } catch (error) {
      console.log("[error]", error.response);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching data");
        const top5Scores = await client.GetTopScorers();
        setTop5Scores(top5Scores);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    fetchUser();
  }, []);
  return (
    <div>
      {account && (<LoggedInHome />)}
      {!account && (
        <div>
          <div className="d-flex justify-content-center ">
            <Link to="/signup" className="btn btn-secondary" role="button">
              {/* <PersonCircle size={30} className="mr-3" /> */}
              Sign Up
            </Link>
            <Link to="/Login" className="btn btn-primary" role="button">
              {/* <PersonCircle size={30} className="mr-3" /> */}
              Sign In
            </Link>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-center vh-100">
            <h1 className="mb-5">Welcome to the Country Game! 🌎</h1>
            <div className="d-flex flex-column align-items-center">
              <h3>Highest Scorers:</h3>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">Username</th>
                    <th scope="col">Avg Score</th>
                  </tr>
                </thead>
                <tbody>
                  {top5Scores.map((score, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{score.username}</td>
                      <td>{score.score} points</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex flex-column align-items-center pt-4">
            <h4>Calling all Geography and Travel Enthusiasts!</h4>
            <p className="col-6 text-center">
              This is a game where you can test your knowledge of countries. You can also learn about countries you have never
              heard of before and share which countries you've traveled to or are on your bucket list</p>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnonymousHome;
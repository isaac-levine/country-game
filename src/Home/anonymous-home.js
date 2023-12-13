import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as client from "../Play/client.js";

function AnonymousHome() {
  const [top5Scores, setTop5Scores] = useState([]);
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
  }, []);
  return (
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
          Highest Scorers: 
          {top5Scores.map((score, index) => (
            <div key={index}>
              {index + 1}. {score.username} - {score.score} points
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnonymousHome;
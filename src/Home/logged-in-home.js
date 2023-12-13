import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons";
import SmallSearchBar from "../Search/small-search-bar";
import * as client from "../Users/client.js";

function LoggedInHome() {
  const [account, setAccount] = useState(null);
  const fetchAccount = async () => {
    const account = await client.account();
    setAccount(account);
};
useEffect(() => {
      fetchAccount();
}, []);
  const userName = "Bob" // Replace with user's actual name
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
          Welcome, {account.username}! {userFlag}
        </h1>
        <div className="d-flex flex-column align-items-center">
          <Link to="/Play" className="btn btn-primary btn-lg mb-3" role="button">
            Play Game
          </Link>
          <a href="#" className="btn btn-dark btn-lg mb-3" role="button">
            🏆 View Leaderboards
          </a>
        </div>
      </div>
    </div>
  );
}

export default LoggedInHome;

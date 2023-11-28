import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Search/SearchBar";
import Nav from "../Nav";

function AnonymousHome() {
  return (
    <div>
        <Nav/>
      <div className="d-flex justify-content-center ">
        <SearchBar />
        <Link to="/loggedin" className="btn btn-secondary" role="button">
          {/* <PersonCircle size={30} className="mr-3" /> */}
          Sign Up
        </Link>
        <Link to="/loggedin" className="btn btn-primary" role="button">
          {/* <PersonCircle size={30} className="mr-3" /> */}
          Sign In
        </Link>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h1 className="mb-5">Welcome to the Country Game! 🌎</h1>
        <div className="d-flex flex-column align-items-center"></div>
      </div>
    </div>
  );
}

export default AnonymousHome;
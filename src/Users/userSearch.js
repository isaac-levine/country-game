import SmallSearchBar from "../Search/small-search-bar.js";
import "./index.css";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import GetAllCountries from "../get-all-countries.js";
import { findAllUsers } from "./client.js";

function Search() {
  const { searchWord } = useParams();
  const searchWordCopy = searchWord;
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(searchWordCopy) || "";

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/usersearch/${searchTerm}`);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await findAllUsers();
        setResults(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const sortResults = () => {
    let lowercaseSearchTerm = "";
    if (searchWord != undefined) {
      lowercaseSearchTerm = searchTerm.toLowerCase();
    }
    let sortedResults = results
      .sort((a, b) => a.username.localeCompare(b.username))
      .filter(
        (user) =>
          searchWord === "" ||
          !searchWord ||
          user.username.toLowerCase().includes(lowercaseSearchTerm) ||
          user.firstName.toLowerCase().includes(lowercaseSearchTerm) ||
          user.lastName.toLowerCase().includes(lowercaseSearchTerm)
      );
    return sortedResults;
  };
  const sortedResults = sortResults();

  return (
    <div>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className="input-box pt-6">
            <input
              type="text"
              placeholder="🔍 Search for users"
              className="form-control"
              value={searchTerm}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              default={searchTerm}
            />
            <i className="fa fa-search"></i>
          </div>
          <div className="mt-3 mb-3">Results: </div>
          <ul className="list-group">
            {sortedResults.map((user, index) => (
              <li key={index} className="list-group-item">
                <Link to={`/Profile/${user._id}`} style={{color: "black", textDecoration: "none"}}>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ width: "30%", textAlign: "right" }}>
                        <strong>Username:</strong>
                      </td>
                      <td style={{ width: "70%" }}>{user.username}</td>
                    </tr>
                    <tr>
                      <td style={{ width: "30%", textAlign: "right" }}>
                        <strong>First Name:</strong>
                      </td>
                      <td style={{ width: "70%" }}>{user.firstName}</td>
                    </tr>
                    <tr>
                      <td style={{ width: "30%", textAlign: "right" }}>
                        <strong>Last Name:</strong>
                      </td>
                      <td style={{ width: "70%" }}>{user.lastName}</td>
                    </tr>
                    <tr>
                      <td style={{ width: "30%", textAlign: "right" }}>
                        <strong>Status:</strong>
                      </td>
                      <td style={{ width: "70%" }}>{user.status}</td>
                    </tr>
                  </tbody>
                </table>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Search;

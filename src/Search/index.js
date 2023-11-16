import Nav from "../Nav";
import SearchBar from "./SearchBar";
import "./index.css";
import React, { useState, useEffect } from 'react';
import SearchResults from "./SearchResults"; 
import CountryList from "./SearchResults/searchTest";

function Search() {
    const [searchTerm, setSearchTerm] = useState('');
      
    const handleSearch = (term) => {
        console.log("handlesearch");
        setSearchTerm(term);
    };

    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchAndDisplayResults = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const data = await response.json();
    
            setResults(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchAndDisplayResults();
    }, []);

    const sortedTop20 = results
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .slice(0, 20);
    return(
        <div>
            <Nav/>
            <div className="container mt-5">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-6">
                    <SearchBar onSearch={handleSearch} />
                     {/* <SearchResults searchTerm={searchTerm} /> */}
                    <ul className="list-group mt-5">
                    {sortedTop20.map(country => ( //Only showing top 20 results by default
                    <li key={country.cca2} className="list-group-item">
                        <strong>{country.name.common} {country.flag}</strong>
                        <p>Capital: {country.capital}</p>
                        <p>Region: {country.region}   </p>
                    </li>
                    ))}
                </ul>
                    </div>
                </div>
            </div>
        </div>
    );
 };
 export default Search;

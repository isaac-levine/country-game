import Nav from "../Nav";
import SearchBar from "./SearchBar";
import SearchFilters from "./SearchFilters";
import "./index.css";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
                    <div className="col-md-3">
                        </div>
                    <div className="col-md-6">
                    <SearchBar onSearch={handleSearch} />
                    <ul className="list-group mt-5">
                    {sortedTop20.map(country => ( //Only showing top 20 results by default
                    <li key={country.cca2} className="list-group-item">
                        <Link to={`/Search/${country.cca2}`}><strong>{country.name.common} {country.flag}</strong></Link>
                        <p>Capital: {country.capital}<br/>
                        Region: {country.region} </p>
                    </li>
                    ))}
                </ul>
                    </div>
                    <div className="col-md-3">
                        <SearchFilters/>
                        </div>
                </div>
            </div>
        </div>
    );
 };
 export default Search;

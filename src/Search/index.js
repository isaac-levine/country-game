import Nav from "../Nav";
import SearchBar from "./SearchBar";
import SearchFilters from "./SearchFilters";
import "./index.css";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



function Search({initialSearchTerm}) {
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm || '');
    const [displayCount, setDisplayCount] = useState(20);
      
    const handleSearch = (term) => {
        console.log("handlesearch");
        setSearchTerm(term);
        setDisplayCount(5); 
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

    const sortResults = () => {
        const lowercaseSearchTerm = searchTerm.toLowerCase();
        return results
        .sort((a, b) => a.name.common.localeCompare(b.name.common))
        .filter((country) => (searchTerm === '' || !searchTerm ||
        country.name.common.toLowerCase().includes(lowercaseSearchTerm) ||
        country.region.toLowerCase().includes(lowercaseSearchTerm) ||
        (country.subregion && country.subregion.toLowerCase().includes(lowercaseSearchTerm)) ||
          (country.capital &&
            country.capital[0].toLowerCase().includes(lowercaseSearchTerm))));
      
    }
    const sortedResults = sortResults();
    const visibleResults = sortedResults.slice(0, displayCount);
    const nextResults = sortedResults.slice(displayCount, displayCount + 20);
    const handleLoadMore = () => {
        const visibleResults = sortedResults.slice(displayCount, displayCount + 20);
        setDisplayCount(displayCount + 20);
      };

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
                    {visibleResults.map(country => ( //Only showing top 20 results by default
                    <li key={country.cca2} className="list-group-item">
                        <Link className="d-inline me-2 cg-link" to={`/Search/${country.cca2}`}><strong>{country.name.common} </strong></Link>
                        {country.flag} <br/>
                        <p>Capital: {country.capital}<br/>
                        Region: {country.region} <br/>
                        Subregion: {country.subregion} </p>
                    </li>
                    ))}
                </ul>
                {nextResults.length > 0 && (
                    <button className="btn btn-primary mt-3" onClick={handleLoadMore}>
                    Load More
                    </button>
                )}
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
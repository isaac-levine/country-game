import SearchBar from "./SearchBar";
import "./index.css";
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";

function Search({initialSearchTerm}) {
    const { encodedSearchTerm } = useParams();
    const [searchTerm, setSearchTerm] = useState(encodedSearchTerm || initialSearchTerm || '');
    const [displayCount, setDisplayCount] = useState(20);
    const [showForm, setShowForm] = useState(false);
    const [language, setLanguage] = useState('');
    const [langIsChecked, setLangIsChecked] = useState(false);
    const [populationIsChecked, setPopulationIsChecked] = useState(false);
    const [minPopulation, setMinPopulation] = useState(0);
    const [maxPopulation, setMaxPopulation] = useState(8045311447);
    const handleLangCheckboxChange = () => {setLangIsChecked(!langIsChecked);};
    const handlePopulationCheckboxChange = () => {setPopulationIsChecked(!populationIsChecked);};
    const handleShowForm = () => {setShowForm(!showForm);};
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
        let sortedResults = results
        .sort((a, b) => a.name.common.localeCompare(b.name.common))
        .filter((country) => (searchTerm === '' || !searchTerm ||
        country.name.common.toLowerCase().includes(lowercaseSearchTerm) ||
        country.region.toLowerCase().includes(lowercaseSearchTerm) ||
        (country.subregion && country.subregion.toLowerCase().includes(lowercaseSearchTerm)) ||
          (country.capital &&
            country.capital[0].toLowerCase().includes(lowercaseSearchTerm))));
        if (langIsChecked) {
            sortedResults = sortedResults.filter((country) => 
            country.languages && Object.values(country.languages).some(lang => lang.toLowerCase().includes(language.toLowerCase())));
        }
        if(populationIsChecked) {
            sortedResults = sortedResults.filter((country) => 
            country.population >= minPopulation && country.population <= maxPopulation);
        }
        return sortedResults;
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
            <div className="container mt-5">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-3">
                        </div>
                    <div className="col-md-6 mb-5">
                    <SearchBar onSearch={handleSearch} />
                    <ul className="list-group mt-5">
                    {visibleResults.map(country => ( //Only showing top 20 results by default
                    <li key={country.cca2} className="list-group-item">
                        <Link className="d-inline me-2 cg-link" to={`/Details/${country.cca2}`}><strong>{country.name.common} </strong></Link>
                        <div className="float-end">
                            <img src={country.flags.png} className='flag-image m-6 search-result-flag'/></div>
                        <p>Capital: {country.capital}<br/>
                        Region: {country.region} <br/>
                        Subregion: {country.subregion} </p>
                      
                    </li>
                    ))}
                </ul>
                {nextResults.length > 0 && (
                    <button className="btn btn-primary mt-3 mb-4" onClick={handleLoadMore}>
                    Load More
                    </button>
                )}
                    </div>
                    <div className="col-md-3">
                    <button onClick={handleShowForm} className="btn">{showForm ? <FaAngleDown/> : <FaAngleRight/>}</button>
                    {showForm && (
                        <div className="ps-3">
                        <h4>Filter </h4>
                        <form>
                        <label className="pb-2" for="lang">
                            <input className="form-check-input me-2" type="checkbox" name="language" checked={langIsChecked} onChange={handleLangCheckboxChange}/>
                            Language <br/>
                            <input className="form-control" placeholder="type a language here" id="lang"
                            value={language} onChange={(e) => setLanguage(e.target.value)}/>
                        </label> <br/>
                        <label className="pb-2" for="population">
                            <input className="form-check-input me-2" type="checkbox" name="population" checked={populationIsChecked} onChange={handlePopulationCheckboxChange}/>
                            Population <br/>
                            <div className="container">
                            <div className="row">
                                <div className="col-6 ps-0">
                                <label htmlFor="minPopulation">Min:</label>
                                <input
                                    className="form-control"
                                    id="minPopulation"
                                    value={minPopulation}
                                    onChange={(e) => setMinPopulation(e.target.value)}
                                    type="number"
                                />
                                </div>
                                <div className="col-6 ps-0">
                                <label htmlFor="maxPopulation">Max:</label>
                                <input
                                    className="form-control"
                                    id="maxPopulation"
                                    value={maxPopulation}
                                    onChange={(e) => setMaxPopulation(e.target.value)}
                                    type="number"
                                />
                                </div>
                            </div>
                            </div>
                        </label>
                        </form> </div>
                    )}
                        </div>
                </div>
            </div>
        </div>
    );
 };
 export default Search;

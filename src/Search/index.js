import "./index.css";
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate} from 'react-router-dom';
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import GetAllCountries from "../get-all-countries";
import * as client from "../Likes/client.js";
//TODO : add order by

function Search() {
    const { searchWord } = useParams();
    const searchWordCopy = searchWord;
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState(searchWordCopy) || '';
    const [displayCount, setDisplayCount] = useState(20);
    const [showForm, setShowForm] = useState(false);
    const [language, setLanguage] = useState('');
    const [langIsChecked, setLangIsChecked] = useState(false);
    const [currencyIsChecked, setCurrencyIsChecked] = useState(false);
    const [currency, setCurrency] = useState('');
    const [populationIsChecked, setPopulationIsChecked] = useState(false);
    const [minPopulation, setMinPopulation] = useState(0);
    const [maxPopulation, setMaxPopulation] = useState(8045311447);
    const [traveledToCounts, setTraveledToCounts] = useState({});
    const [bucketListCounts, setBucketListCounts] = useState({});
    const handleLangCheckboxChange = () => {setLangIsChecked(!langIsChecked);};
    const handlePopulationCheckboxChange = () => {setPopulationIsChecked(!populationIsChecked);};
    const handleCurrencyCheckboxChange = () => {setCurrencyIsChecked(!currencyIsChecked);};
    const handleShowForm = () => {setShowForm(!showForm);};
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            navigate(`/Search/${searchTerm}`);
        }
    };

    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await GetAllCountries();
            setResults(data);
            const countsObject = {};
            const countsObject2 = {};
            // for (const countryID of data.map(country => country.cca2).sort()) {
            //     console.log(countryID);
            //     const traveledTo = await client.getTraveledToByCountry(countryID);
            //     countsObject[countryID] = traveledTo.length;
            //     const onBucketList = await client.getOnBucketListByCountry(countryID);
            //     countsObject2[countryID] = onBucketList.length;
            // }
            setTraveledToCounts(countsObject);
            setBucketListCounts(countsObject2);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
    }, []);

    const getTraveledToByCountry = async (countryID) => {
        const traveledTo = await client.getTraveledToByCountry(countryID);
        console.log(traveledTo);
        console.log(traveledTo.length);
        return parseInt(traveledTo.length, 10);
    }

    const getOnBucketListByCountry = async (countryID) => {
        const onBucketList = await client.getOnBucketListByCountry(countryID);
        return onBucketList;
    }

    const sortResults = () => {
        let lowercaseSearchTerm = '';
        if(searchWord != undefined) {
            lowercaseSearchTerm = searchWord.toLowerCase();
        }
        let sortedResults = results
        .sort((a, b) => a.name.common.localeCompare(b.name.common))
        .filter((country) => (searchWord === '' || !searchWord ||
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
        if(currencyIsChecked) {
            sortedResults = sortedResults.filter((country) => 
            country.currencies && Object.values(country.currencies).some(curr => curr.name.toLowerCase().includes(currency.toLowerCase())));
        }
        return sortedResults;
    }
    
    const sortedResults = sortResults();
    let visibleResults = sortedResults.slice(0, displayCount);
    const nextResults = sortedResults.slice(displayCount, displayCount + 20);
    const handleLoadMore = () => {
        visibleResults = sortedResults.slice(displayCount, displayCount + 20);
        setDisplayCount(displayCount + 20);
    };
    return(
        <div>
            <div className="container mt-5">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-3">
                        </div>
                    <div className="col-md-6 mb-5">
                    <div className="input-box pt-6">
                    <input
                        type="text"
                        placeholder="🔍 Search for countries and country data"
                        className="form-control"
                        value={searchTerm}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        default={searchTerm}
                    />
                    <i className="fa fa-search">
                    </i>
                    </div>
                    <div className="mt-3 mb-3">Results: {visibleResults.length} of {sortedResults.length}</div>
                    <ul className="list-group">
                    {visibleResults.map(country => ( //Only showing top 20 results by default
                    <li key={country.cca2} className="list-group-item">
                        <Link className="d-inline me-2 cg-link" to={`/Details/${country.cca2}`}><strong>{country.name.common} </strong></Link>
                        <div className="float-end">
                            <img src={country.flags.png} className='flag-image m-6 search-result-flag'/></div>
                        <p>Capital: {country.capital}<br/>
                        Region: {country.region} <br/>
                        Subregion: {country.subregion} </p>
                        {/* Traveled to: {traveledToCounts[country.cca2] || 0} <br/>
                        On Bucket List: {bucketListCounts[country.cca2] || 0} */}
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
                        <label className="pb-2" for="currency">
                            <input className="form-check-input me-2" type="checkbox" name="currency" checked={currencyIsChecked} onChange={handleCurrencyCheckboxChange}/>
                            Currency <br/>
                            <input className="form-control" placeholder="type a currency here" id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)}/>
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

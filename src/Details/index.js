import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { FaBucket } from "react-icons/fa6";
import { ImCheckmark } from "react-icons/im";
import * as likesClient from "../likes/client";
import * as userService from "../Users/client";
//todo maps?

const CountryDetails = ({countryID}) => {
  const { id } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [traveledTo, setTraveledTo] = useState(false);
  const [onBucketList, setOnBucketList] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      const user = await userService.account();
      setCurrentUser(user);
    } catch {
      console.error('Error fetching current user');
    }
  };

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await fetch(`https://restcountries.com/v2/alpha/${id}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setCountryDetails(data);
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };

    fetchCountryDetails();
    fetchCurrentUser();
  }, [id]);

  if (!countryDetails) {
    return <div>Loading...</div>;
  }

  const handleOnBucketListClick = () => {
    setOnBucketList(!onBucketList);
  }

  const like = async () => {
    await likesClient.createUserLikesCountry(currentUser._id, id);
  };

  const addCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className='col-md-3'>
          <Link className="nav-link" to="/Search"><FaArrowLeft className='m-2 pb-1'/>Back to Search</Link>
          </div>
          <div className="col-md-6 justify-content-center">
            <h2 className='d-inline'>{countryDetails.name} <img src={countryDetails.flag} className='flag-image'/></h2>
            <div className='float-end'>
            <button onClick={like} className="btn">
              <ImCheckmark className={`like-btn ${traveledTo ? "cg-green" : "cg-grey"}`} />
            </button>
            <button onClick={handleOnBucketListClick} className="btn">
              <FaBucket className={`like-btn ${onBucketList ? "cg-blue" : "cg-grey"}`} />
            </button>
            </div><br/>
            <p>
              Capital: {countryDetails.capital} <br />
              Region: {countryDetails.region} <br />
              Currency: {countryDetails.currencies[0].name} ({countryDetails.currencies[0].symbol}) <br />
              Languages: {addCommas(countryDetails.languages.map(language => " " +  language.name))} <br />
              Population: {addCommas(countryDetails.population)} <br/>
              Area: {countryDetails.area} km<sup>2</sup> <br/>
            </p>
          </div>
          <div className='col-md-3'></div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;

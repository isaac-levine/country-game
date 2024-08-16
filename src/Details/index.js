import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { FaBucket } from "react-icons/fa6";
import { ImCheckmark } from "react-icons/im";
import * as client from "../Users/client.js";
import * as likesClient from "../Likes/client.js";
//todo maps?

const CountryDetails = ({countryID}) => {
  const { id } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);
  const [traveledTo, setTraveledTo] = useState(false);
  const [onBucketList, setOnBucketList] = useState(false);
  const [account, setAccount] = useState(null);
  const [usersTraveledTo, setUsersTraveledTo] = useState(null);
  const [usersOnBucketList, setUsersOnBucketList] = useState(null);

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
    fetchUsersWhoLikeCountry();
    fetchAccount();
  }, [id]);

  const fetchAccount = async () => {
    try {
      const account = await client.account();
      setAccount(account);
      fetchUserLikesCountry(account);
    }
    catch (error) {
      console.log('[error]', error.response);
    }
  };

  const fetchUserLikesCountry = async (account) => {
    if(account) {
      console.log("fetchUserLikesCountry");
      const likesCountry = await likesClient.getUserLikesCountry(account._id, id);
      if(likesCountry.length > 0) {
        setTraveledTo(likesCountry[0].haveTraveledTo);
        setOnBucketList(likesCountry[0].onBucketList);
      }
    }
  }

  useEffect(() => {
    if(account && traveledTo !== null && onBucketList !== null && countryDetails !== undefined) {
      likeCountry();
    }
  }, [traveledTo, onBucketList]);

  const likeCountry = async () => {
    const likesCountry = await likesClient.getUserLikesCountry(account._id, id);
    if(likesCountry.length === 0) {
      console.log("creating like");
      console.log(countryDetails.name)
      const response = await likesClient.createLike(account._id, id, countryDetails.name);
    }
    const updateResponse = await likesClient.updateLike(account._id, id, traveledTo, onBucketList);
  };

  const fetchUsersWhoLikeCountry = async () => {
    const usersTraveledTo = await likesClient.getUsersTraveledToByCountry(id);
    const usersOnBucketList = await likesClient.getUsersOnBucketListByCountry(id);
    setUsersTraveledTo(usersTraveledTo);
    setUsersOnBucketList(usersOnBucketList);
    console.log(usersTraveledTo);
  }


  if (!countryDetails) {
    return <div>Loading...</div>;
  }

  const handleTraveledToClick = () => {
    setTraveledTo(!traveledTo);
  };

  const handleOnBucketListClick = () => {
    setOnBucketList(!onBucketList);
  }

  const addCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div>
      {!account && <div class="row">
                <div class="col-12 d-flex justify-content-center">
                <p class="text-center mt-5"><span className="d-block mb-3">Please log in to see country details</span>
                <Link to={`/Login`}>
                        <button type="button" className="btn btn-primary"> Sign in </button>
                    </Link>
                    <Link to={`/signup`}>
                        <button type="button" className="btn btn-primary"> Sign Up </button>
                    </Link> </p>
        </div> </div>}
      {account && <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className='col-md-3'>
          <Link className="nav-link" to="/Search"><FaArrowLeft className='m-2 pb-1'/>Back to Search</Link>
          </div>
          <div className="col-md-6 justify-content-center">
            <h2 className='d-inline'>{countryDetails.name} <img src={countryDetails.flag} className='flag-image'/></h2>
            {account && <div className='float-end'>
            <button onClick={handleTraveledToClick} className="btn">
              <ImCheckmark className={`like-btn ${traveledTo ? "cg-green" : "cg-grey"}`} />
            </button>
            <button onClick={handleOnBucketListClick} className="btn">
              <FaBucket className={`like-btn ${onBucketList ? "cg-blue" : "cg-grey"}`} />
            </button> 
            </div>}<br/>
            <p>
              Capital: {countryDetails.capital} <br />
              Region: {countryDetails.region} <br />
              Currency: {countryDetails.currencies[0].name} ({countryDetails.currencies[0].symbol}) <br />
              Languages: {addCommas(countryDetails.languages.map(language => " " +  language.name))} <br />
              Population: {addCommas(countryDetails.population)} <br/>
              Area: {countryDetails.area} km<sup>2</sup> <br/>
              <div className="row">
                <div className='col-md-5'>
              {usersTraveledTo && usersTraveledTo.length || 0} users have traveled here<br/>
              {/* <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton">
                  Dropdown button
                </button> */}
                {/* <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {usersTraveledTo && usersTraveledTo.map(user => <Link to={`/Profile/${user.userId}`} className="list-group-item list-group-item-action">{user.name}</Link>)}
                </div> */}
                <div className="list-group">
                  {usersTraveledTo && usersTraveledTo.map(user => <Link to={`/Profile/${user.userId}`} className="list-group-item list-group-item-action">{user.name} </Link>)}
                </div>
        
              </div>
              <div className='col-md-5'>
              On {usersOnBucketList && usersOnBucketList.length || 0} bucket lists<br/>
              <div className="list-group">
                  {usersOnBucketList && usersOnBucketList.map(user => <Link to={`/Profile/${user.userId}`} className="list-group-item list-group-item-action">{user.name}</Link>)}
                </div>
              </div>
              
               </div>
            </p>
          </div>
          <div className='col-md-3'>
            Current User: {account && account.username}
          </div>
        </div>
      </div>}
    </div>
  );
};

export default CountryDetails;
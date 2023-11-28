import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../Nav';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";
import { IoMdHeart } from "react-icons/io";

const CountryDetails = () => {
  const { id } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);
  const [countryLiked, setCountryLiked] = useState(false);

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
  }, [id]);

  if (!countryDetails) {
    return <div>Loading...</div>;
  }

  const handleButtonClick = () => {
    setCountryLiked(!countryLiked); // Toggle the value of showForm
  };

  return (
    <div>
      <Nav />
      <div className="container mt-5">
        <div className="row d-flex justify-content-center">
          <div className='col-md-3'>
          <Link className="nav-link" to="/Search"><FaArrowLeft className='m-2 pb-1'/>Back to Search</Link>
          </div>
          <div className="col-md-6 justify-content-center">
            <h2 className='d-inline'>{countryDetails.name} <img src={countryDetails.flag} className='flag-image'/></h2>
            <div className='float-end'>
            <button onClick={handleButtonClick} className="btn">
              <IoMdHeart className={`like-btn ${countryLiked ? "cg-red" : "cg-grey"}`} />
            </button>
            </div><br/>
            <p>
              Capital: {countryDetails.capital} <br />
              Region: {countryDetails.region} <br />
              Currency: {JSON.stringify(countryDetails.currencies)} <br />
              Languages {JSON.stringify(countryDetails.languages)} <br />
              Population: {countryDetails.population} <br/>
              Gini: {countryDetails.gini}
            </p>
          </div>
          <div className='col-md-3'></div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;

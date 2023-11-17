// CountryDetails.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../Nav';

const CountryDetails = () => {
  const { id } = useParams();
  const [countryDetails, setCountryDetails] = useState(null);

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

  return (
    <div>
        <Nav/>
        <div className="row d-flex justify-content-center ">
          <div className='col-md-8'>
      <h2>{countryDetails.name}</h2>
      <p>Capital: {countryDetails.capital} <br/>
      Region: {countryDetails.region} <br/>
      Currency: {countryDetails.currency} <br/>
      Population: {countryDetails.population} 
      
      </p>
      </div>
      </div>
    </div>
  );
};

export default CountryDetails;

// CountryList.js
import React, { useEffect, useState } from 'react';

const CountryList = () => {
  const [top10Results, setTop10Results] = useState([]);

  useEffect(() => {
    const fetchAndDisplayTop10 = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        const top10 = data.slice(0, 10);
  
        setTop10Results(top10);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchAndDisplayTop10();
  }, []); // Empty dependency array to run the effect once when the component mounts

  return (
    <div>
      <h2>Top 10 Countries</h2>
      <ul>
        {top10Results.map(country => (
          <li key={country.cca2}>
            <strong>{country.name.common}</strong>
            <p>Capital: {country.capital}</p>
            <p>Region: {country.region}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;

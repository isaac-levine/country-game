// SearchResults.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchResults = ({ searchTerm }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const response = await axios.get('https://restcountries.eu/rest/v2/all');
        // setData(response.data);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect once when the component mounts

  // Filter data based on the search term
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.capital.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Search Results</h1>
    </div>
  );
};

export default SearchResults;

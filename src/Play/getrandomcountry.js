import GetAllCountries from "../get-all-countries";
import { useState, useEffect } from 'react';
//TODO: Does not work at the moment but will be useful if we have multiple games
function GetRandomCountry() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("GetRandomCountry");
                const data = await GetAllCountries();
                const randomCountryIndex = Math.floor(Math.random() * data.length);
                const selectedCountry = data[randomCountryIndex];
                return selectedCountry;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
}

export default GetRandomCountry;

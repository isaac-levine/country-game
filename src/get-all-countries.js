const GetAllCountries = async () => {
        try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
}
export default GetAllCountries;
import GetRandomCountry from "./getrandomcountry";
import { useState, useEffect } from 'react';
import GetAllCountries from "../get-all-countries";
import "./index.css"
import { useNavigate, Link } from "react-router-dom";
import * as client from "./client.js"
//TODO: Style, make scoring reflect the population of the country
function Play() {
    const [randomCountry, setRandomCountry] = useState(null);
    const [results, setResults] = useState([]);
    const [points, setPoints] = useState(1000);
    const [cluesAvailable, setCluesAvailable] = useState(1);
    const [guess, setGuess] = useState('');
    const handleGuessChange = (e) => { setGuess(e.target.value); }
    const [gameOver, setGameOver] = useState(false);
    const [guessCorrect, setGuessCorrect] = useState(false);
    const navigate = useNavigate();
    const [guessInputted, setGuessInputted] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const countries = await GetAllCountries();
                setResults(countries);
                const randomCountryIndex = Math.floor(Math.random() * countries.length);
                const selectedCountry = countries[randomCountryIndex];
                setRandomCountry(selectedCountry);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const addCommas = (array) => {
        return array.join(', ');
      };
    const addCommasToNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const handleKeyPress = (e) => { 
        if(e.key === 'Enter') {
            setGuessInputted(true);
            if(guess.toLowerCase() === randomCountry.name.common.toLowerCase()) {
                setGameOver(true);
                setGuessCorrect(true);
                setCluesAvailable(5);
                // TODO: send data to server
            }
            else {
                setGameOver(false);
            }
        }
    }

    const sendScore = async () => {
        
    }
    const revealClue = (num) => {
        return num <= cluesAvailable;
    }

    const showNextClue = () => {
        if(cluesAvailable < 5) {
            setCluesAvailable(cluesAvailable + 1);
            setPoints(points - 200);
        }
    }
    const revealAnswer = () => {
        setPoints(0);
        setGameOver(true);
        setCluesAvailable(5);
    }


    const newGame = () => {
        window.location.reload();
    }

    return (
        <div className="row">
            <h1>Guess the country</h1>
            <div className="col-8">
            <div className="container ">
            {randomCountry && (
                <>
                    <span className="d-block" id="1">Population: {revealClue(1) ? addCommasToNumber(randomCountry.population) : <p>?</p>} </span> 
                    <span className="d-block">Official Languages: {revealClue(2) ? addCommas(Object.values(randomCountry.languages)) : <p className="d-inline">?</p>}</span>
                    <span className="d-block">Capital: {revealClue(3) ? randomCountry.capital : <p className="d-inline">?</p>}</span>
                    <span className="d-block">Flag: {revealClue(4) ? <img src={randomCountry.flags["png"]} className='flag-image'/> : <p className="d-inline">?</p>}</span>
                    <span className="d-block">Currencies: {revealClue(5) ? addCommas(Object.values(randomCountry.currencies).map(currency => currency.name)) : <p className="d-inline">?</p>}</span>
                    <input type="text"
                        placeholder="Guess the country"
                        className="form-control"
                        onKeyPress={handleKeyPress}
                        onChange={handleGuessChange}
                        value={guess}>
                    </input>
                    {guessInputted && (guessCorrect ? <p>Correct!</p> : <p>Wrong!</p>)}
                    {gameOver && <p>You got {points} points</p>}
                    <button onClick={showNextClue} disabled={cluesAvailable === 5} className="cg-button-clue btn">Show next clue</button>
                    <button onClick={revealAnswer} disabled={gameOver} className="cg-button-reveal btn">Reveal answer</button>
                    <span className="d-block">Answer: {gameOver ?  <Link to={`/Details/${randomCountry.cca2}`}>{randomCountry.name.common}</Link> : ""}</span>
                    <button onClick={newGame} className="btn btn-light">New game</button>
                </>
            )}
            </div>
            </div>
            <div className="col-4">
                <h3>Points: {points}</h3>
                <p>How does it work?</p>
                <p>Guess the country using clues provided. The more clues you use, the less points you will get. Good luck!</p>
            </div>
        </div>
    );
}

export default Play;

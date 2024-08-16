import GetRandomCountry from "./getrandomcountry";
import { useState, useEffect } from 'react';
import GetAllCountries from "../get-all-countries";
import "./index.css"
import { Link } from "react-router-dom";
import * as client from "./client.js"
import * as userClient from "../Users/client.js";
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
    const [guessInputted, setGuessInputted] = useState(false);
    const [account, setAccount] = useState(null);
    const [answerRevealed, setAnswerRevealed] = useState(false);
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
        fetchAccount();
    }, []);

    const fetchAccount = async () => {
        try {
            const account = await userClient.account();
            setAccount(account);
        }
        catch (error) {
            console.log('[error]', error.response);
        }
    };


    const addCommas = (array) => {
        return array.join(', ');
      };
    const addCommasToNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const handleKeyPress = (e) => { 
        if(e.key === 'Enter') {
            if(gameOver) {
                newGame();
            }
            setGuessInputted(true);
            if(guess.toLowerCase() === randomCountry.name.common.toLowerCase()) {
                setGameOver(true);
                setGuessCorrect(true);
                setCluesAvailable(5);
                sendScore(points);
            }
            else {
                setGameOver(false);
            }
        }
    }

    const sendScore = async (score) => {
        const response = await client.PostGameScore({
            username: account.username, gameId: "1", pts: score
        })
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
    const revealAnswer = async () => {
        try {
          setPoints(0);
          setAnswerRevealed(true);
          setGameOver(true);
      
          // Wait for the asynchronous operation to complete before proceeding
          await sendScore(0);
          setCluesAvailable(5);
        } catch (error) {
          console.error('Error in revealAnswer:', error);
        }
      };
      


    const newGame = () => {
        window.location.reload();
    }

    return (
        <div>
            {!account && <div class="row">
                <div class="col-12 d-flex justify-content-center">
                <p class="text-center mt-5"><span className="d-block mb-3">Please log in to play the game</span>
                <Link to={`/Login`}>
                        <button type="button" className="btn btn-primary"> Sign in </button>
                    </Link>
                    <Link to={`/signup`}>
                        <button type="button" className="btn btn-primary"> Sign Up </button>
                    </Link> </p>
        </div> </div>}
            {account &&
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
            <div className="col-md-4 col-12">
                Current User: {account && account.username}
                <h3>Points: {points}</h3>
                <p>How does it work?</p>
                <p>Guess the country using clues provided. The more clues you use, the less points you will get. Good luck!</p>
            </div>
        </div>}
        </div>
    );
}

export default Play;

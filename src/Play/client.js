import axios from "axios";
import * as userClient from "../Users/client.js";

const request = axios.create({
    withCredentials: true,
});
export const BASE_API = "http://localhost:4000";
//export const BASE_API = process.env.REACT_APP_BASE_COUNTRY_URL;
export const GAME_DATA_API = `${BASE_API}/api/game_data`;

export const PostGameScore = async (score) => {
    console.log(score)
    const response = await request.post(GAME_DATA_API, score);
    return response.data;
};

export const GetTop5Scorers = async () => {
    const users = await userClient.findAllUsers();
    let response = [];
    for(let i = 0; i < users.length; i++) {
        const user = users[i];
        const userScores = await request.get(`${GAME_DATA_API}/user/${user._id}/game/1`);
        console.log(userScores);
        if(userScores > 0) {
            response.push(userScores.data);
        }   
    }
    return response.sort((a, b) => b.pts - a.pts).slice(0, 5);
}


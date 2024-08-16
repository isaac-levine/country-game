import axios from "axios";

const request = axios.create({
    withCredentials: true,
});

export const BASE_API = process.env.REACT_APP_BASE_COUNTRY_URL;
//export const BASE_API = "http://localhost:4000";
export const GAME_DATA_API = `${BASE_API}/api/game_data`;

export const PostGameScore = async (score) => {
    console.log(score)
    const response = await request.post(GAME_DATA_API, score);
    return response.data;
};

export const GetTopScorers = async () => {
    const users = await request.get(`${GAME_DATA_API}/users`);
    let response = [];
    const userList = users.data;
    for(let i = 0; i < userList.length; i++) {
        const user = userList[i];
        const userScores = await request.get(`${GAME_DATA_API}/user/${user}/game/1/average`);
        if(userScores.data > 0) {
            response.push({username : user, score :userScores.data});
        }   
    }
    return response.sort((a, b) => b.score - a.score).slice(0, 5);
}

//Could change this to hold timestamps
export const GetRecentUserScores = async (username) => {
    const response = await request.get(`${GAME_DATA_API}/user/${username}/game/1`);
    return response.data.reverse().slice(0, 5);
}

export const GetAverageScore = async (username) => {
    const response = await request.get(`${GAME_DATA_API}/user/${username}/game/1/average`);
    return response.data;
}

export const GetNumGamesPlayed = async (username) => {
    const response = await request.get(`${GAME_DATA_API}/user/${username}/num_games`);
    return response.data;
}
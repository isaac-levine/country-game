import axios from "axios";

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

export const GetTopScorers = async () => {
    const users = await request.get(`${GAME_DATA_API}/users`);
    let response = [];
    const userList = users.data;
    for(let i = 0; i < userList.length; i++) {
        const user = userList[i];
        const userScores = await request.get(`${GAME_DATA_API}/user/${user}/game/1`);
        if(userScores.data > 0) {
            response.push({username : user, score :userScores.data});
        }   
    }
    return response.sort((a, b) => b.pts - a.pts).slice(0, 5);
}

export const GetRecentUserScores = async (username) => {
    const response = await request.get(`${GAME_DATA_API}/user/${username}/game/1`);
    return response.data;
}


import axios from "axios";

const request = axios.create({
    withCredentials: true,
});

export const BASE_API = process.env.REACT_APP_BASE_COUNTRY_URL;
export const GAME_DATA_API = `${BASE_API}/api/game_data`;

export const PostGameScore = async (score, u_id) => {
    const response = await request.post(`${GAME_DATA_API}/score`, {score, u_id});
    return response.data;
};
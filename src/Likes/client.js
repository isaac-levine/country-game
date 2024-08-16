import axios from "axios";

const request = axios.create({
    withCredentials: true,
});
//export const BASE_API = "http://localhost:4000";
export const BASE_API = process.env.REACT_APP_BASE_COUNTRY_URL;
export const LIKES_API = `${BASE_API}/api/likes`;

export const getAllLikes = async () => {
    const response = await request.get(`${LIKES_API}`);
    return response.data;
}

export const getLikesByUser = async (userId) => {
    const response = await request.get(`${LIKES_API}/user/${userId}`);
    return response.data;
}

export const getTraveledToByUser = async (userId) => {
    const response = await request.get(`${LIKES_API}/traveled/user/${userId}`);
    return response.data;
}

export const getOnBucketListByUser = async (userId) => {
    const response = await request.get(`${LIKES_API}/bucketlist/user/${userId}`);
    return response.data;
}

// export const getLikesByCountry = async (countryId) => {
//     const response = await request.get(`${LIKES_API}/country/${countryId}`);
//     return response.data;
// }

export const getTraveledToByCountry = async (countryId) => {
    const response = await request.get(`${LIKES_API}/traveled/country/${countryId}`);
    return response.data;
}

export const getOnBucketListByCountry = async (countryId) => {
    const response = await request.get(`${LIKES_API}/bucketlist/country/${countryId}`);
    return response.data;
}

export const updateLike = async (userId, countryCode, traveledTo, onBucketList) => {
    if(traveledTo === null || onBucketList === null) {
        return [];
    }
    const response = await request.put(`${LIKES_API}/user/${userId}/country/${countryCode}/${traveledTo}/${onBucketList}`);
    return response.data;
}

export const createLike = async (userId, countryCode, countryName) => {
    const response = await request.post(`${LIKES_API}/user/${userId}/country/${countryCode}/name/${countryName}`);
    return response.data;
}

export const getLikeByUserAndCountry = async (userId, countryCode) => {
    const response = await request.get(`${LIKES_API}/user/${userId}/country/${countryCode}`);
    return response.data;
}

export const getUserLikesCountry = async (userId, countryCode) => {
    const response = await request.get(`${LIKES_API}/user/${userId}/country/${countryCode}`);
    return response.data;
}

export const getUsersTraveledToByCountry = async (countryCode) => {
    const response = await request.get(`${LIKES_API}/traveledTo/country/${countryCode}`);
    return response.data;
}

export const getUsersOnBucketListByCountry = async (countryCode) => {
    const response = await request.get(`${LIKES_API}/bucketList/country/${countryCode}`);
    return response.data;
}

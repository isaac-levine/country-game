import axios from "axios";
const request = axios.create({
  withCredentials: true,
});

const LIKES_API = "http://localhost:4000/api";

export const findAllLikes = async () => {
  const response = await request.get(`${LIKES_API}/likes`);
  return response.data;
};
export const createUserLikesCountry = (userId, CO) => {
  const response = request.post(
    `${LIKES_API}/users/${userId}/likes/${CO}`
  );
  return response.data;
};
export const findAlbumsUserLikes = (userId) => {
  const response = request.get(`${LIKES_API}/users/${userId}/likes`);
  return response.data;
};
export const findUsersWhoLikeAlbum = (CO) => {
  const response = request.get(`${LIKES_API}/albums/${CO}/likes`);
  return response.data;
};
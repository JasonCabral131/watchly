/** @format */

export const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmZkZWI4NTNhNDJjYjE5NjhjNDM3MTJhYTNiYTY1NCIsIm5iZiI6MTc0NzIxMjkyMS42NTQsInN1YiI6IjY4MjQ1YTc5NTgzNGFlNThmNDVhMzcyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JNJ8gBlzkqKdBiFIoxb3trtlWertdbOVnBrOagpgR2I';

export const BASE_URL = 'https://api.themoviedb.org/3/';

export const AUTH_HEADER = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};

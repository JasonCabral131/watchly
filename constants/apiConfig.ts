/** @format */

export const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmZkZWI4NTNhNDJjYjE5NjhjNDM3MTJhYTNiYTY1NCIsIm5iZiI6MTc0NzIxMjkyMS42NTQsInN1YiI6IjY4MjQ1YTc5NTgzNGFlNThmNDVhMzcyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JNJ8gBlzkqKdBiFIoxb3trtlWertdbOVnBrOagpgR2I';

export const BASE_URL = 'https://api.themoviedb.org/3/';

export const AUTH_HEADER = {
  Authorization: `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
};

export const API = {
  image: 'https://image.tmdb.org/t/p/original',
  popular: 'movie/popular',
  recommendation: 'movie/299534/recommendations',
  kidTvShow:
    'https://api.themoviedb.org/3/discover/tv?with_genres=10762&sort_by=popularity.desc',
  KidMovie:
    'https://api.themoviedb.org/3/discover/movie?with_genres=10751&certification_country=US&certification.lte=G&sort_by=popularity.desc',
  koreanMovies:
    'https://api.themoviedb.org/3/discover/movie?with_original_language=ko&sort_by=popularity.desc',
  koreanTvShows:
    'https://api.themoviedb.org/3/discover/tv?with_original_language=ko&sort_by=popularity.desc',
  PHMovies:
    'https://api.themoviedb.org/3/discover/movie?with_original_language=tl&region=PH&sort_by=popularity.desc',
  marvelMovies:
    'https://api.themoviedb.org/3/discover/movie?with_keywords=180547&sort_by=popularity.desc',
  marvelTvShows:
    'https://api.themoviedb.org/3/discover/tv?with_keywords=180547&sort_by=popularity.desc',
};

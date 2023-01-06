export const API_HOST = "https://api.themoviedb.org/3";
export const API_WEEKLY_TRENDING = (page) => `/trending/all/week?page=${page}`;
export const API_CONFIGURATION = "/configuration";
export const API_MEDIA = (movieId, mediaType) => `/${mediaType}/${movieId}`;

export const HOME_SCREEN = "Home";
export const MOVIE_SCREEN = "Movie";

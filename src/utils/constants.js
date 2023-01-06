export const API_HOST = "https://api.themoviedb.org/3";
export const API_WEEKLY_TRENDING = "/trending/all/week?page=1";
export const API_CONFIGURATION = "/configuration";
export const API_MEDIA = (movieId, mediaType) => `/${mediaType}/${movieId}`;

export const HOME_SCREEN = "Home";
export const MOVIE_SCREEN = "Movie";

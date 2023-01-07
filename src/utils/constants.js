export const API_HOST = "https://api.themoviedb.org/3";
export const API_WEEKLY_TRENDING = (mediaType, page) =>
  `/trending/${mediaType}/week?page=${page}`;
export const API_CONFIGURATION = "/configuration";
export const API_MEDIA = (movieId, mediaType) => `/${mediaType}/${movieId}`;

export const HOME_SCREEN = "Home";
export const MOVIE_SCREEN = "Movie";

export const DESIRED_IMAGES_WIDTHS = [100, 400, 800];
export const IMAGES_SIZES = {
  small: "small",
  medium: "medium",
  large: "large",
  original: "original",
};

export const POSTER_RATIO = 16 / 10;

export const colors = {
  background: "#000000",
  tabs: "#02081F",
  text: "white",
};

export const VOTE_COLORS = [
  {
    r: 255,
    b: 0,
    g: 0,
  },
  {
    r: 255,
    g: 85,
    b: 0,
  },
  {
    r: 0,
    g: 180,
    b: 0,
  },
];
export const VOTE_COLORS_VALUES = [4, 6.5, 8.5];

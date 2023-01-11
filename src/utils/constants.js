// api constants
export const API_HOST = "https://api.themoviedb.org/3";
export const API_WEEKLY_TRENDING = (mediaType, page) =>
  `/trending/${mediaType}/week?page=${page}`;
export const API_CONFIGURATION = "/configuration";
export const API_MEDIA = (mediaType, mediaId) => `/${mediaType}/${mediaId}`;
export const API_MEDIA_VIDEOS = (mediaType, mediaId) =>
  `/${mediaType}/${mediaId}/videos`;
export const HOME_SCREEN = "Home";
export const MOVIE_SCREEN = "Movie";
export const TV_SHOW_SCREEN = "Tv";
export const YOUTUBE_SITE = "YouTube";

export const MEDIA_TYPES = {
  movie: "movie",
  tv: "tv",
};

// styles constants
export const DESIRED_IMAGES_WIDTHS = [100, 400, 800];
export const IMAGES_SIZES = {
  small: "small",
  medium: "medium",
  large: "large",
  original: "original",
};
export const POSTER_RATIO = 16 / 10;
export const SCENE_RATIO = 11 / 20;
export const FLAT_LIST_SCENE_WIDTH = 250;
export const colors = {
  background: "#000000",
  tabs: "#02081F",
  text: "white",
  link: "#918aff",
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
export const VERTICAL_POSTERS_IN_SCREEN = 3;

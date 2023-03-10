// api constants
export const API_URL_V3 = "https://api.themoviedb.org/3";
export const API_URL_V4 = "https://api.themoviedb.org/4";
export const API_WEEKLY_TRENDING = (mediaType, page) =>
  `/trending/${mediaType}/week?page=${page}`;
export const API_CONFIGURATION = "/configuration";
export const API_MEDIA = (mediaType, mediaId) => `/${mediaType}/${mediaId}`;
export const API_MEDIA_VIDEOS = (mediaType, mediaId) =>
  `/${mediaType}/${mediaId}/videos`;
export const API_NEW_REQUEST_TOKEN = `${API_URL_V4}/auth/request_token`;
export const API_NEW_ACCESS_TOKEN = `${API_URL_V4}/auth/access_token`;
export const AUTHENTICATE_TOKEN_LINK = (token) =>
  `https://www.themoviedb.org/auth/access?request_token=${token}`;
export const API_NEW_SESSION = "/authentication/session/convert/4";
export const API_DELETE_SESSION = "/authentication/session";
export const API_SEARCH_MEDIA = (mediaType, searchText, page) =>
  `/search/${mediaType}?query="${searchText}"&page=${page}`;
export const API_ACCOUNT_DETAILS = (sessionId) =>
  `/account?session_id=${sessionId}`;
export const API_LISTS = (accountId, sessionId, page) =>
  `/account/${accountId}/lists?session_id=${sessionId}&page=${page}`;
export const API_GET_LIST = (listId) => `/list/${listId}`;
export const API_CREATE_NEW_LIST = (sessionId) =>
  `/list?session_id=${sessionId}`;
export const API_MARK_FAVORITE = (accountId, sessionId) =>
  `/account/${accountId}/favorite?session_id=${sessionId}`;
export const API_FAVORITES = (accountId, mediaType, sessionId, page) => {
  if (mediaType === MEDIA_TYPES.movie) mediaType = mediaType + "s";
  return `/account/${accountId}/favorite/${mediaType}?session_id=${sessionId}&page=${page}`;
};
export const API_ADD_ITEMS_TO_LIST = (listId) =>
  `${API_URL_V4}/list/${listId}/items`;

// Gravatar API
export const API_GRAVATAR_IMAGE_PATH = (hash) =>
  `https://www.gravatar.com/avatar/${hash}`;
export const API_DELETE_LIST = (listId) => `${API_URL_V4}/list/${listId}`;
export const API_DELETE_ITEM_FROM_LIST = (listId) =>
  `${API_URL_V4}/list/${listId}/items`;

// Navigation and Screen names
export const SEARCH_NAVIGATION = "SearchNavigation";
export const TV_TRENDING_NAVIGATION = "TvTrendingNavigation";
export const MOVIES_TRENDING_NAVIGATION = "MoviesTrendingNavigation";
export const MEDIA_NAVIGATION = "MediaNavigation";
export const MEDIA_SCREEN = "MediaScreen";
export const TV_TRENDING_SCREEN = "TvTrendingScreen";
export const MOVIES_TRENDING_SCREEN = "MoviesTrendingScreen";
export const SEARCH_SCREEN = "SearchScreen";
export const HOME_NAVIGATION = "HomeNavigation";
export const TRENDING_NAVIGATION = "TrendingNavigation";
export const ACCOUNT_NAVIGATION = "AccountNavigation";
export const ACCOUNT_SCREEN = "AccountScreen";
export const LIST_SCREEN = "ListScreen";
export const NEW_LIST_SCREEN = "NewListScreen";
export const IMAGE_LIST_SCREEN = "ImageListScreen";
export const YOUTUBE_SITE = "YouTube";
export const MEDIA_SEARCH_SCREEN = "MediaSearchScreen";
export const FAVORITES_NAVIGATION = "FavoritesNavigation";
export const MEDIA_LIST_SCREEN = "MediaListScreen";
export const MEDIA_LIST_NAVIGATION = "MediaListNavigation";
export const MOVIES_FAVORITES_NAVIGATION = "MoviesFavoritesNavigation";
export const TV_FAVORITES_NAVIGATION = "TvFavoritesNavigation";
export const ADD_TO_LIST_SCREEN = "AddToListScreen";

export const MEDIA_TYPES = {
  movie: "movie",
  tv: "tv",
};
export const MEDIA_LIST_TYPES = {
  trending: "trending",
  favorites: "favorites",
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
export const gradientCardColors = ["#2b067a", "#2807a3"];
export const colors = {
  background: "#000000",
  tabs: "#02081F",
  bright: "white",
  link: "#918aff",
  dimmed: "#aaa",
  error: "#f00",
  danger: "red",
  selected: "#ff4d4d",
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

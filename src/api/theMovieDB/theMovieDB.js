import { ACCESS_TOKEN } from "@env";
import {
  API_CONFIGURATION,
  API_DELETE_SESSION,
  API_HOST,
  API_MEDIA,
  API_MEDIA_VIDEOS,
  API_NEW_SESSION,
  API_NEW_TOKEN,
  API_SEARCH_MEDIA,
  API_WEEKLY_TRENDING,
  IMAGES_SIZES,
} from "@app/utils/constants";
import { ApiController } from "@app/domain/apiController";
import {
  apiMedia2Media,
  apiVideo2Video,
  throwError,
} from "@app/api/theMovieDB/theMovieDB.utils";
import { ApiResponse } from "@app/domain/ApiResponses";

export class TheMovieDBController extends ApiController {
  constructor() {
    super();
    this.myHeaders = new Headers();
    this.myHeaders.append("Content-Type", "application/json;charset=utf-8");
    this.myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
    (async () => {
      this.configuration = await this.#configuration();
      this.postersBaseSizes = this.#getImagesBaseSizes(
        this.configuration.images.poster_sizes
      );
      this.backdropBaseSizes = this.#getImagesBaseSizes(
        this.configuration.images.backdrop_sizes
      );
      this.stillBaseSizes = this.#getImagesBaseSizes(
        this.configuration.images.still_sizes
      );
      this.logoBaseSizes = this.#getImagesBaseSizes(
        this.configuration.images.logo_sizes
      );
    })();
  }

  deleteSession = async (sessionId) => {
    try {
      const url = `${API_HOST}${API_DELETE_SESSION}`;
      const body = { session_id: sessionId };
      const result = await this.#fetch(url, { method: "DELETE", body });
      if (!result.success) return result;
      return result;
    } catch (err) {
      console.error("Error deleting session");
      console.error(err);
      return new ApiResponse({ success: false, message: err.message });
    }
  };

  createNewSession = async (token) => {
    try {
      const url = `${API_HOST}${API_NEW_SESSION}`;
      const body = { request_token: token };
      const result = await this.#fetch(url, { method: "POST", body });
      if (!result.success) return result;
      result.value = result.rawValue.session_id;
      return result;
    } catch (err) {
      console.error("Error creating new session");
      console.error(err);
      return new ApiResponse({ success: false, message: err.message });
    }
  };

  getNewToken = async () => {
    try {
      const url = `${API_HOST}${API_NEW_TOKEN}`;
      const result = await this.#fetch(url);
      if (!result.success) return result;
      result.value = {
        token: result.rawValue.request_token,
        expiresAt: result.rawValue.expires_at,
      };
      return result;
    } catch (err) {
      console.error("Error obtaining new token");
      console.error(err);
      return new ApiResponse({ success: false, message: err.message });
    }
  };

  searchMedia = async (page = 1, mediaType, searchText) => {
    try {
      const url = `${API_HOST}${API_SEARCH_MEDIA(mediaType, searchText, page)}`;
      const result = await this.#fetch(url);
      if (!result.success) return result;
      result.value = result.rawValue.results.map((media) =>
        this.#apiMedia2Media(media, mediaType)
      );
      result.totalPages = result.rawValue.total_pages;
      return result;
    } catch (err) {
      console.error(
        `Error fetching search media for searchText: ${searchText} and mediaType: ${mediaType}`
      );
      console.error(err);
      return new ApiResponse({ success: false, message: err.message });
    }
  };

  getWeeklyTrendingMedia = async (page = 1, mediaType = "movie") => {
    try {
      const url = `${API_HOST}${API_WEEKLY_TRENDING(mediaType, page)}`;
      const result = await this.#fetch(url);
      if (!result.success) return result;
      result.value = result.rawValue.results.map((media) =>
        this.#apiMedia2Media(media, mediaType)
      );
      result.totalPages = result.rawValue.total_pages;
      return result;
    } catch (err) {
      console.error("Error fetching trending media");
      console.error(err);
      return new ApiResponse({ success: false, message: err.message });
    }
  };

  getMedia = async (mediaType, mediaId) => {
    try {
      const url = `${API_HOST}${API_MEDIA(mediaType, mediaId)}`;
      const result = await this.#fetch(url);
      if (!result.success) {
        console.error(
          `could not fetch media for mediaType: ${mediaType} and mediaId: ${mediaId}`
        );
        return result;
      }
      result.value = this.#apiMedia2Media(result.rawValue, mediaType);
      return result;
    } catch (err) {
      console.error("Error fetching media");
      console.error(err);
      return new ApiResponse({ success: false, message: err.message });
    }
  };

  getMediaVideos = async (mediaType, mediaId) => {
    try {
      const url = `${API_HOST}${API_MEDIA_VIDEOS(mediaType, mediaId)}`;
      const result = await this.#fetch(url);
      if (!result.success) return result;
      result.value = result.rawValue.results.map((video) =>
        apiVideo2Video(video)
      );
      return result;
    } catch (err) {
      throwError(err, "Error media Videos");
    }
  };

  // Utils Functions
  #fetch = async (url, { method, body } = { method: "GET" }) => {
    const response = await fetch(url, {
      headers: this.myHeaders,
      method: method,
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (response.status !== 200) {
      console.log(
        `Error fetching url: ${url} status code is ${response.status}`
      );
      // console.log("Response: ", result);
      return new ApiResponse({
        success: false,
        rawValue: result,
        message: result.status_message,
      });
    }
    return new ApiResponse({
      success: true,
      rawValue: result,
    });
  };

  #configuration = async () => {
    try {
      const url = `${API_HOST}${API_CONFIGURATION}`;
      const result = await this.#fetch(url);
      return result.rawValue;
    } catch (err) {
      throwError(err, "Error fetching configuration");
    }
  };

  #getImagesBaseSizes = (availableSizes) => {
    // everything with word "size" is a string
    // everything with word "width" is a number
    const desiredWidths = [100, 400, 800];
    const desiredWidthsNames = [
      IMAGES_SIZES.small,
      IMAGES_SIZES.medium,
      IMAGES_SIZES.large,
    ];
    const posterWidths = new Map();
    availableSizes.forEach((posterSize) => {
      if (posterSize === IMAGES_SIZES.original) return;
      const width = /\d+/.exec(posterSize)[0];
      posterWidths.set(Number(width), posterSize);
    });
    const closestSizes = desiredWidths.map((size) => {
      const posterWidthsIter = posterWidths.keys();
      let width = posterWidthsIter.next();
      let closestSize;
      let closestDistance = Infinity;
      while (width.done === false) {
        if (closestDistance > Math.abs(size - width.value)) {
          closestDistance = Math.abs(size - width.value);
          closestSize = posterWidths.get(width.value);
        }
        width = posterWidthsIter.next();
      }
      return closestSize;
    });
    const baseSizes = {};
    closestSizes.forEach((size, index) => {
      // baseSizes[desiredWidthsNames[index]] = `${base_url}${size}`;
      baseSizes[desiredWidthsNames[index]] = size;
    });
    if (availableSizes.includes(IMAGES_SIZES.original)) {
      baseSizes[IMAGES_SIZES.original] = IMAGES_SIZES.original;
    } else {
      baseSizes[IMAGES_SIZES.original] = baseSizes[baseSizes.length - 1];
    }
    return baseSizes;
  };

  #apiMedia2Media = (media, mediaType) => {
    return apiMedia2Media(media, mediaType, {
      baseImageUrl: this.configuration.images.base_url,
      postersBaseSizes: this.postersBaseSizes,
      backdropBaseSizes: this.backdropBaseSizes,
      stillBaseSizes: this.stillBaseSizes,
      logoBaseSizes: this.logoBaseSizes,
    });
  };
}

import { ACCESS_TOKEN } from "@env";
import {
  API_CONFIGURATION,
  API_HOST,
  API_MEDIA,
  API_WEEKLY_TRENDING,
  IMAGES_SIZES,
} from "@app/utils/constants";
import { ApiController } from "@app/domain/apiController";
import { apiMedia2Media } from "@app/api/theMovieDB/theMovieDB.utils";
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
    })();
  }

  getWeeklyTrendingMedia = async (page = 1, mediaType = "movie") => {
    try {
      const url = `${API_HOST}${API_WEEKLY_TRENDING(mediaType, page)}`;
      const result = await this.#fetch(url);
      if (!result.success) return result;
      result.value = result.rawValue.results.map((media) =>
        this.#apiMedia2Media(media)
      );
      result.totalPages = result.rawValue.total_pages;
      return result;
    } catch (err) {
      console.error("Error fetching trending media");
      throw err;
    }
  };

  getMedia = async (mediaId, mediaType) => {
    try {
      const url = `${API_HOST}${API_MEDIA(mediaId, mediaType)}`;
      const result = await this.#fetch(url);
      if (!result.success) return result;
      // console.log("51: result.rawValue >>>", result.rawValue);
      result.value = this.#apiMedia2Media(result.rawValue);
      return result;
    } catch (err) {
      console.error("Error fetching trending media");
      throw err;
    }
  };

  // Utils Functions
  #fetch = async (url) => {
    const response = await fetch(url, {
      headers: this.myHeaders,
    });
    const result = await response.json();
    if (response.status !== 200) {
      console.error("Error fetching, status code is " + response.status);
      console.error("Response: ", result);
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
      console.error("Error fetching configuration");
      console.error(err);
      throw err;
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

  #apiMedia2Media = (media) => {
    return apiMedia2Media(
      media,
      this.postersBaseSizes,
      this.backdropBaseSizes,
      this.configuration.images.base_url
    );
  };
}

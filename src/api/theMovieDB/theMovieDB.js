import { ACCESS_TOKEN } from "@env";
import {
  API_CONFIGURATION,
  API_HOST,
  API_MEDIA,
  API_WEEKLY_TRENDING,
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
      this.postersBaseLinks = this.#getPostersBaseLinks(this.configuration);
    })();
  }

  getWeeklyTrendingMedia = async () => {
    try {
      const url = `${API_HOST}${API_WEEKLY_TRENDING}`;
      const result = await this.#fetch(url);
      if (!result.success) return result;
      result.value = result.value.results.map((media) =>
        apiMedia2Media(media, this.postersBaseLinks)
      );
      // console.log("33: result >>>", result);
      return result;
    } catch (err) {
      console.error("Error fetching trending media");
      throw err;
    }
  };

  getMedia = async (mediaId, mediaType) => {
    // console.log("38: movieId >>>", movieId);
    try {
      const url = `${API_HOST}${API_MEDIA(mediaId, mediaType)}`;
      const result = await this.#fetch(url);
      if (!result.success) return result;
      result.value = apiMedia2Media(result.value, this.postersBaseLinks);
      // console.log("42: movie >>>", movie);
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
      console.log("Response: ", result);
      return new ApiResponse({
        success: false,
        value: result,
        message: result.status_message,
      });
    }
    return new ApiResponse({
      success: true,
      value: result,
    });
  };

  #configuration = async () => {
    try {
      const url = `${API_HOST}${API_CONFIGURATION}`;
      const result = await this.#fetch(url);
      return result.value;
    } catch (err) {
      console.log("Error fetching configuration");
      console.error(err);
      throw err;
    }
  };

  #getPostersBaseLinks = (configuration) => {
    // everything with word "size" is a string
    // everything with word "width" is a number
    const posterSizes = configuration.images.poster_sizes;
    const desiredWidths = [100, 400, 800];
    const desiredWidthsNames = ["small", "medium", "large"];
    const posterWidths = new Map();
    const originalImageSize = "original";
    posterSizes.forEach((posterSize) => {
      if (posterSize === originalImageSize) return;
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
    const base_url = configuration.images.secure_base_url;
    const baseLinks = {};
    closestSizes.forEach((size, index) => {
      baseLinks[desiredWidthsNames[index]] = `${base_url}${size}`;
    });
    if (posterSizes.includes(originalImageSize)) {
      baseLinks[originalImageSize] = `${base_url}${originalImageSize}`;
    } else {
      baseLinks[originalImageSize] = baseLinks[baseLinks.length - 1];
    }
    return baseLinks;
  };
}

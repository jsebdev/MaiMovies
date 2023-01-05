import { ACCESS_TOKEN } from "@env";
import {
  API_CONFIGURATION,
  API_HOST,
  API_WEEKLY_TRENDING,
} from "@app/utils/constants";
import { ApiController } from "@app/domain/apiController";
import { Media } from "@app/domain/MediaType";
import { apiMedia2Media } from "@app/api/theMovieDB/theMovieDB.utils";

export class TheMovieDBController extends ApiController {
  constructor() {
    super();
    this.myHeaders = new Headers();
    this.myHeaders.append("Content-Type", "application/json;charset=utf-8");
    this.myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
    (async () => {
      this.configuration = await this.#configuration();
      this.postersBaseLinks = this.#getPostersBaseLinks(this.configuration);
      // console.log("20: this.postersBaseLinks >>>", this.postersBaseLinks);
    })();
  }

  getWeeklyTrendingMedia = async () => {
    try {
      const url = `${API_HOST}${API_WEEKLY_TRENDING}`;
      const response = await this.#fetch(url);
      const result = await response.json();
      return result.results.map(
        (media) => new Media(apiMedia2Media(media, this.postersBaseLinks))
      );
    } catch (err) {
      console.error("Error fetching trending media");
      throw err;
    }
  };

  // Utils Functions
  #fetch = async (url) =>
    await await fetch(url, {
      headers: this.myHeaders,
    });

  #configuration = async () => {
    try {
      const url = `${API_HOST}${API_CONFIGURATION}`;
      const response = await this.#fetch(url);
      const result = await response.json();
      return result;
    } catch (err) {
      console.log("Error fetching configuration");
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

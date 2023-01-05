import { ACCESS_TOKEN } from "@env";
import { API_HOST, API_WEEKLY_TRENDING } from "@app/utils/constants";
import { ApiController } from "@app/domain/apiController";
import { Media } from "@app/domain/MediaType";
import { apiMedia2Media } from "@app/api/theMovieDB/theMovieDBUtils";

export class TheMovieDBController extends ApiController {
  constructor() {
    super();
    this.myHeaders = new Headers();
    this.myHeaders.append("Content-Type", "application/json;charset=utf-8");
    this.myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
  }

  fetch = async (url) =>
    await await fetch(url, {
      headers: this.myHeaders,
    });

  getWeeklyTrendingMedia = async () => {
    try {
      const url = `${API_HOST}${API_WEEKLY_TRENDING}`;
      const response = await this.fetch(url);
      const result = await response.json();
      return result.results.map((media) => new Media(apiMedia2Media(media)));
    } catch (err) {
      console.error("Error fetching trending media");
      throw err;
    }
  };
}

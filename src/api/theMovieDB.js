import { ACCESS_TOKEN } from "@env";
import { API_HOST, API_WEEKLY_TRENDING } from "@app/utils/constants";
import { ApiController } from "@app/domain/apiController";

class TheMovieDBController extends ApiController {
  constructor() {
    super();
    this.myHeaders = new Headers();
    this.myHeaders.append("Content-Type", "application/json;charset=utf-8");
    this.myHeaders.append("Authorization", `Bearer ${ACCESS_TOKEN}`);
  }

  getWeeklyTrendingMedia = async () => {
    try {
      const url = `${API_HOST}${API_WEEKLY_TRENDING}`;
      const response = await fetch(url, {
        headers: this.myHeaders,
      });
      const result = await response.json();
      return result.results;
    } catch (err) {
      console.error("Error fetching trending media");
      throw err;
    }
  };
}

export const theMovieDBController = new TheMovieDBController();

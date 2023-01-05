import { theMovieDBController } from "@app/api/theMovieDB";
import { getMediaName } from "@app/utils/utils";
import { action, autorun, makeObservable, observable, runInAction } from "mobx";

class TrendingStore {
  trendingMedia = [];

  constructor() {
    makeObservable(this, {
      trendingMedia: observable,
      fetchTrendingMedia: action,
    });
    autorun(() => {
      console.log("the trending media is:");
      this.trendingMedia.forEach((media) =>
        console.log("title: ", getMediaName(media))
      );
      console.log("end of autorun");
    });
  }

  async fetchTrendingMedia() {
    const result = await theMovieDBController.getWeeklyTrendingMedia();
    runInAction(() => {
      this.trendingMedia = result;
    });
  }
}

export const trendingStore = new TrendingStore();

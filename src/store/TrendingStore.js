import { mediaController } from "@app/api/media_api";
import { action, makeObservable, observable, runInAction } from "mobx";

class TrendingStore {
  trendingMedia = [];

  constructor() {
    makeObservable(this, {
      trendingMedia: observable,
      fetchTrendingMedia: action,
    });
    // autorun(() => {
    //   console.log("the trending media is:");
    //   this.trendingMedia.forEach((media) => console.log("title: ", media.name));
    // });
  }

  async fetchTrendingMedia() {
    const result = await mediaController.getWeeklyTrendingMedia();
    runInAction(() => {
      this.trendingMedia = result;
    });
  }
}

export const trendingStore = new TrendingStore();

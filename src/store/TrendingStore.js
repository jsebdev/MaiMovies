import { apiController } from "@app/api/apiController";
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
    const result = await apiController.getWeeklyTrendingMedia();
    if (result.success === true) {
      runInAction(() => {
        this.trendingMedia = result.value;
      });
    }
  }
}

export const trendingStore = new TrendingStore();

import { apiController } from "@app/api/apiController";
import { action, makeObservable, observable, runInAction } from "mobx";

class TrendingStore {
  trendingMedia = [];
  page = 0;
  totalPages = Infinity;

  constructor() {
    makeObservable(this, {
      trendingMedia: observable,
      page: observable,
      totalPages: observable,
      fetchNextPageTrendingMedia: action,
    });
  }

  async fetchNextPageTrendingMedia() {
    if (this.page >= this.totalPages) return;
    this.page++;
    const result = await apiController.getWeeklyTrendingMedia(this.page);
    if (result.success === true) {
      runInAction(() => {
        this.trendingMedia = [...this.trendingMedia, ...result.value];
        this.totalPages = result.totalPages;
      });
    }
  }
}

export const trendingStore = new TrendingStore();

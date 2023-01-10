import { apiController } from "@app/api/apiController";
import { MEDIA_TYPES } from "@app/utils/constants";
import { makeAutoObservable, runInAction } from "mobx";

class TrendingStore {
  movies = {
    trendingList: [],
    page: 0,
    totalPages: Infinity,
  };
  tv = {
    trendingList: [],
    page: 0,
    totalPages: Infinity,
  };

  constructor() {
    makeAutoObservable(this);
  }

  async fetchNextPageMediaTrending(mediaType) {
    const media = mediaType === MEDIA_TYPES.movie ? this.movies : this.tv;
    if (media.page >= media.totalPages) return;
    media.page++;
    const result = await apiController.getWeeklyTrendingMedia(
      this.tvPage,
      mediaType
    );
    if (result.success === true) {
      runInAction(() => {
        media.trendingList = [...media.trendingList, ...result.value];
        media.totalPages = result.totalPages;
      });
    }
  }
}

export const trendingStore = new TrendingStore();

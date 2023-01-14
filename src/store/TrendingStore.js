import { apiController } from "@app/api/apiController";
import { MEDIA_TYPES } from "@app/utils/constants";
import { makeAutoObservable, runInAction } from "mobx";

class TrendingStore {
  movies = {
    trendingList: new Map(),
    page: 0,
    totalPages: Infinity,
  };
  tv = {
    trendingList: new Map(),
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
      media.page,
      mediaType
    );
    if (result.success === true) {
      runInAction(() => {
        result.value
          .filter((m) => m.poster.posterPath)
          .forEach((m) => {
            media.trendingList.set(m.id, m);
          });
        media.totalPages = result.totalPages;
      });
    }
  }
}

export const trendingStore = new TrendingStore();

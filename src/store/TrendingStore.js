import { apiController } from "@app/api/apiController";
import { Movie } from "@app/domain/MovieType";
import { TvShow } from "@app/domain/TvShowType";
import { MEDIA_TYPES } from "@app/utils/constants";
import { flow, types } from "mobx-state-tree";

const TrendingStore = types
  .model("unname", {
    // movies: types.optional(types.model(trendingMedia(Movie)), {}),
    // tv: types.optional(types.model(trendingMedia(TvShow)), {}),
  })
  .actions((self) => {
    const fetchNextPageMediaTrending = flow(function* (mediaType) {
      const media = mediaType === MEDIA_TYPES.movie ? self.movies : self.tv;
      if (media.page >= media.totalPages) return;
      media.page++;
      const result = yield apiController.getWeeklyTrendingMedia(
        media.page,
        mediaType
      );
      if (result.success === true) {
        media.trendingList = [...media.trendingList, ...result.value];
        media.totalPages = result.totalPages;
      }
    });

    return { fetchNextPageMediaTrending };
  });

const trendingMedia = (mediaType) =>
  types.model({
    trendingList: types.optional(types.array(mediaType), []),
    page: types.optional(types.number, 0),
    totalPages: Infinity,
  });

export const trendingStore = TrendingStore.create();

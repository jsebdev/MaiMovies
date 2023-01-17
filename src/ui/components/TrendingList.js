import React, { useEffect } from "react";
import { MediaList } from "./commonComponents/MediaList";
import { useStore } from "@app/store/store.hook";
import { observer } from "mobx-react-lite";
import { MEDIA_TYPES } from "@app/utils/constants";

export const TrendingList = observer(({ mediaType }) => {
  const { media, loadNextPageTrendingMedia } = useTrendingMedia(mediaType);
  return (
    <MediaList
      mediaList={Array.from(media.trendingList.values())}
      loadNewData={loadNextPageTrendingMedia}
      showSpinner={media.page < media.totalPages}
    />
  );
});

const useTrendingMedia = (mediaType) => {
  const { trendingStore } = useStore();
  const loadNextPageTrendingMedia = () => {
    try {
      trendingStore.fetchNextPageMediaTrending(mediaType);
    } catch (error) {
      console.error(error);
    }
  };
  const media =
    mediaType === MEDIA_TYPES.movie ? trendingStore.movies : trendingStore.tv;
  useEffect(() => {
    if (media.trendingList.size === 0) {
      (async () => loadNextPageTrendingMedia())();
    }
  }, []);

  return { media, loadNextPageTrendingMedia };
};

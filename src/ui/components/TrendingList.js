import { View } from "react-native";
import React, { useEffect } from "react";
import { MediaList } from "./MediaList";
import { useStore } from "@app/store/store.hook";
import { observer } from "mobx-react-lite";

export const TrendingList = observer(() => {
  const { trendingStore, loadNextPageTrendingMedia } = useTrendingMedia();
  return (
    <View>
      <MediaList
        mediaList={trendingStore.trendingMedia}
        loadNewData={loadNextPageTrendingMedia}
        showSpinner={trendingStore.page < trendingStore.totalPages}
      />
    </View>
  );
});

const useTrendingMedia = () => {
  const { trendingStore } = useStore();
  const loadNextPageTrendingMedia = () => {
    try {
      trendingStore.fetchNextPageTrendingMedia();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (trendingStore.trendingMedia.length === 0) {
      (async () => loadNextPageTrendingMedia())();
    }
  }, []);

  return { trendingStore, loadNextPageTrendingMedia };
};

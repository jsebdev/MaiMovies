import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { MediaList } from "../components/mediaList";
import { useTrendingStore } from "@app/store/useStores";
import { observer } from "mobx-react-lite";

export const TrendingList = observer(() => {
  const { trendingStore, loadNextPageTrendingMedia } = useTrendingMedia();
  return (
    <View>
      <Text>TrendingList</Text>
      <MediaList
        mediaList={trendingStore.trendingMedia}
        loadNewData={loadNextPageTrendingMedia}
        showSpinner={trendingStore.page < trendingStore.totalPages}
      />
    </View>
  );
});

const useTrendingMedia = () => {
  const { trendingStore } = useTrendingStore();
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

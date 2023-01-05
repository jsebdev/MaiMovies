import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTrendingStore } from "@app/store/useStores";
import { getMediaName } from "@app/utils/utils";

export const TrendingScreen = observer(() => {
  const { trendingStore } = useTrendingMedia();
  return (
    <View onTouchStart={() => console.log("tab")}>
      <Text>Trending</Text>
      {trendingStore.trendingMedia.map((media) => (
        <Text key={media.id}>{getMediaName(media)}</Text>
      ))}
    </View>
  );
});

const useTrendingMedia = () => {
  const { trendingStore } = useTrendingStore();
  const loadTrendingMedia = () => {
    try {
      trendingStore.fetchTrendingMedia();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (trendingStore.trendingMedia.length === 0) {
      (async () => loadTrendingMedia())();
    }
  }, []);

  return { trendingStore };
};

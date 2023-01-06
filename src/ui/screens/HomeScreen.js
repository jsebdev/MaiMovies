import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useTrendingStore } from "@app/store/useStores";
import { MediaList } from "../components/mediaList";

export const HomeScreen = observer(() => {
  const { trendingStore } = useTrendingMedia();
  return (
    <View>
      <Text>Trending</Text>
      <MediaList mediaList={trendingStore.trendingMedia} />
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

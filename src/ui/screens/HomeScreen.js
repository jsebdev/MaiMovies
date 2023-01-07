import React from "react";
import { TrendingList } from "../components/TrendingList";
import { BackgroundView } from "../components/BackgroundView";

export const HomeScreen = () => {
  return (
    <BackgroundView>
      <TrendingList />
    </BackgroundView>
  );
};

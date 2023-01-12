import React from "react";
import { TrendingList } from "../components/TrendingList";
import { BackgroundView } from "../components/BackgroundView";
import { MEDIA_TYPES } from "@app/utils/constants";

export const TrendingTvScreen = () => {
  return (
    <BackgroundView>
      <TrendingList mediaType={MEDIA_TYPES.tv} />
    </BackgroundView>
  );
};

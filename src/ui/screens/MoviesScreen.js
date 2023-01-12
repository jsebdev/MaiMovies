import React from "react";
import { TrendingList } from "@components/TrendingList";
import { BackgroundView } from "@app/ui/components/commonComponents/BackgroundView";
import { MEDIA_TYPES } from "@app/utils/constants";

export const MoviesScreen = () => {
  return (
    <BackgroundView>
      <TrendingList mediaType={MEDIA_TYPES.movie} />
    </BackgroundView>
  );
};

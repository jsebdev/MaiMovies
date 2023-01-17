import React from "react";
import { TrendingList } from "@components/TrendingList";
import { BackgroundView } from "@app/ui/components/commonComponents/BackgroundView";
import PropTypes from "prop-types";
import { MEDIA_LIST_TYPES } from "@app/utils/constants";
import { Paragraph } from "../components/commonComponents/Paragraph";

export const MediaListScreen = ({ route }) => {
  const mediaType = route.params.mediaType;
  const listType = route.params.listType;
  return (
    <BackgroundView>
      {listType === MEDIA_LIST_TYPES.trending && (
        <TrendingList mediaType={mediaType} />
      )}
      {listType === MEDIA_LIST_TYPES.favorites && (
        // <FavoritesList mediaType={mediaType} />
        <Paragraph>aqui van los favoritos de tipo {mediaType}</Paragraph>
      )}
    </BackgroundView>
  );
};

MediaListScreen.propTypes = {
  route: PropTypes.object,
};

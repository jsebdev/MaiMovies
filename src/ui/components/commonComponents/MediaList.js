import { FlatList } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { MediaCard } from "./MediaCard";
import { FlatListLoader } from "./FlatListLoader";

export const MediaList = ({
  mediaList,
  loadNewData,
  showSpinner,
  horizontal = false,
  mediaType,
}) => {
  return (
    <FlatList
      data={mediaList}
      keyExtractor={(media) => media.id}
      renderItem={({ item }) => (
        <MediaCard media={item} mediaType={mediaType} />
      )}
      horizontal={horizontal}
      numColumns={!horizontal && 3}
      onEndReached={loadNewData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={<FlatListLoader showSpinner={showSpinner} />}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

MediaList.propTypes = {
  mediaList: PropTypes.array.isRequired,
  loadNewData: PropTypes.func,
  showSpinner: PropTypes.bool,
  horizontal: PropTypes.bool,
  mediaType: PropTypes.string.isRequired,
};

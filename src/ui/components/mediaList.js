import { FlatList, StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { MediaCard } from "./mediaCard";

export const MediaList = ({ mediaList }) => {
  return (
    <FlatList
      data={mediaList}
      showsVerticalScrollIndicator={false}
      keyExtractor={(media) => media.id}
      renderItem={({ item }) => <MediaCard media={item} />}
      contentContainerStyle={styles.flatListContentContainer}
      horizontal={true}
    />
  );
};

MediaList.propTypes = {
  mediaList: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
  },
});

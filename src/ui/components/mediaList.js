import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { MediaCard } from "./MediaCard";

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
      contentContainerStyle={styles.flatListContentContainer}
      horizontal={horizontal}
      numColumns={!horizontal && 3}
      onEndReached={loadNewData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        showSpinner && <ActivityIndicator size="large" style={styles.spinner} />
      }
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
    marginBottom: 50,
  },
  spinner: {
    marginTop: 20,
    marginBottom: 60,
  },
});

MediaList.propTypes = {
  mediaList: PropTypes.array.isRequired,
  loadNewData: PropTypes.func,
  showSpinner: PropTypes.bool,
  horizontal: PropTypes.bool,
  mediaType: PropTypes.string.isRequired,
};

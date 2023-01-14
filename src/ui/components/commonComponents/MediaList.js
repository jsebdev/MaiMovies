import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
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
        <View style={styles.spinnerContainer}>
          <View style={styles.spinner}>
            {showSpinner && <ActivityIndicator size="large" />}
          </View>
        </View>
      }
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  flatListContentContainer: {},
  spinnerContainer: {
    // borderWidth: 1,
    // borderColor: "blue",
    alignItems: "center",
  },
  spinner: {
    height: 80,
    width: 80,
    justifyContent: "center",
    // borderColor: "red",
    // borderWidth: 2,
    paddingHorizontal: 30,
  },
});

MediaList.propTypes = {
  mediaList: PropTypes.array.isRequired,
  loadNewData: PropTypes.func,
  showSpinner: PropTypes.bool,
  horizontal: PropTypes.bool,
  mediaType: PropTypes.string.isRequired,
};

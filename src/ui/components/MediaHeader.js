import { View, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { IMAGES_SIZES, POSTER_RATIO } from "@app/utils/constants";
import { LinearGradient } from "expo-linear-gradient";

export const MediaHeader = ({ media }) => {
  return (
    <View style={styles.container}>
      <View style={styles.backdropContainer}>
        <Image
          style={styles.backdrop}
          source={{ uri: media.getBackdrop(IMAGES_SIZES.large) }}
        />
        {/* <LinearGradient style={styles.backdropGradient} /> */}
      </View>
      <View style={styles.DataContainer}>
        <Image
          source={{ uri: media.getPoster(IMAGES_SIZES.medium) }}
          style={styles.poster}
        />
      </View>
    </View>
  );
};

MediaHeader.propTypes = {
  media: PropTypes.object.isRequired,
};

const posterWidth = Dimensions.get("window").width / 3;
const posterHeight = posterWidth * POSTER_RATIO;

const styles = StyleSheet.create({
  container: {},
  backdropContainer: {},
  backdrop: {
    height: 250,
    width: "100%",
    position: "absolute",
  },
  backdropGradient: {},
  DataContainer: {
    borderWidth: 2,
    borderColor: "red",
    backgroundColor: "#0000",
    top: 150,
  },
  poster: { height: posterHeight, width: posterWidth },
});

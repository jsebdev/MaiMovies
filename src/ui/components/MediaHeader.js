import { View, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { colors, IMAGES_SIZES, POSTER_RATIO } from "@app/utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import { BackgroundView } from "./BackgroundView";
import { Paragraph } from "./Paragraph";

export const MediaHeader = ({ media }) => {
  return (
    <BackgroundView style={styles.container}>
      <View style={styles.backdropContainer}>
        <Image
          style={styles.backdrop}
          source={{ uri: media.getBackdrop(IMAGES_SIZES.large) }}
        />
        <LinearGradient
          style={styles.backdropGradient}
          colors={backdropGradient}
        />
      </View>
      <View style={styles.DataContainer}>
        <Paragraph variant="title">{media.name}</Paragraph>
        <Image
          source={{ uri: media.getPoster(IMAGES_SIZES.medium) }}
          style={styles.poster}
        />
      </View>
    </BackgroundView>
  );
};

MediaHeader.propTypes = {
  media: PropTypes.object.isRequired,
};

const posterWidth = Dimensions.get("window").width / 3;
const posterHeight = posterWidth * POSTER_RATIO;

const styles = StyleSheet.create({
  container: {
    borderColor: "yellow",
    // borderWidth: 5,
    // backgroundColor: "r",
  },
  backdropContainer: {
    height: 200,
    width: "100%",
    borderColor: "green",
    // borderWidth: 5,
    position: "absolute",
  },
  backdrop: {
    width: "100%",
    height: "100%",
    borderColor: "white",
    // borderWidth: 10,
  },
  backdropGradient: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  DataContainer: {
    // borderWidth: 2,
    borderColor: "red",
    backgroundColor: "#0000",
    paddingLeft: 20,
    top: 100,
  },
  poster: { height: posterHeight, width: posterWidth },
});

const backdropGradient = [`${colors.background}77`, colors.background];

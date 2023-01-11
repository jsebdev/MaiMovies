import { Image, Platform, StyleSheet } from "react-native";
import React from "react";
import { FLAT_LIST_SCENE_WIDTH, SCENE_RATIO } from "@app/utils/constants";
import PropTypes from "prop-types";
import { A } from "@expo/html-elements";

const videoWidth = FLAT_LIST_SCENE_WIDTH;
const videoHeight = videoWidth * SCENE_RATIO;

export const VideoImage = ({ video }) => {
  return (
    <>
      <Image
        style={styles.thumbnail}
        source={{ uri: `https://img.youtube.com/vi/${video.key}/0.jpg` }}
      />
      <A href={video.getUrl()} style={styles.playButtonContainer}>
        <Image
          style={styles.playButtonImage}
          source={require("@assets/images/play.png")}
        />
      </A>
    </>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    width: videoWidth,
    height: videoHeight,
    position: "absolute",
    borderColor: "red",
    // borderWidth: 2,
  },
  playButtonContainer: {
    width: 70,
    height: 70,
    borderColor: "green",
    // borderWidth: 2,
    flex: Platform.OS === "android" ? 1 : 0,
    opacity: 0.6,
  },
  playButtonImage: {
    width: 70,
    height: 70,
  },
});

VideoImage.propTypes = {
  video: PropTypes.object,
};

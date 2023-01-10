import { Image, Platform, StyleSheet, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { A } from "@expo/html-elements";
import { Paragraph } from "../Paragraph";

const videoWidth = 250;
const videoHeight = (videoWidth * 11) / 20;

export const VideoThumbnail = ({ video }) => {
  return (
    <View style={styles.container}>
      <View style={styles.thumbnailContainer}>
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
      </View>
      <View style={styles.TitleContainer}>
        <Paragraph style={styles.title}>{video.name}</Paragraph>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    justifyContent: "flex-start",
    // borderWidth: 1,
  },
  thumbnailContainer: {
    width: videoWidth,
    height: videoHeight,
    // borderWidth: 1,
    borderColor: "green",
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
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
  },
  playButtonImage: {
    //todo check if opacity is supported
    width: 70,
    height: 70,
  },
  TitleContainer: {
    width: videoWidth,
  },
  title: {
    textAlign: "center",
    fontSize: 11,
  },
});

VideoThumbnail.propTypes = {
  video: PropTypes.object.isRequired,
};

import { StyleSheet, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { Paragraph } from "../Paragraph";
import { FLAT_LIST_SCENE_WIDTH, SCENE_RATIO } from "@app/utils/constants";

const videoWidth = FLAT_LIST_SCENE_WIDTH;
const videoHeight = videoWidth * SCENE_RATIO;

export const HorizontalThumbnail = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.thumbnailContainer}>{children}</View>
      {title && (
        <View style={styles.TitleContainer}>
          <Paragraph style={styles.title}>{title}</Paragraph>
        </View>
      )}
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
  TitleContainer: {
    width: videoWidth,
  },
  title: {
    textAlign: "center",
    fontSize: 11,
  },
});

HorizontalThumbnail.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

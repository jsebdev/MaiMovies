import { StyleSheet, View } from "react-native";
import React from "react";
import { Paragraph } from "../Paragraph";
import PropTypes from "prop-types";
import { A } from "@expo/html-elements";
import { MyLink } from "../commongComponents/MyLink";

export const MediaInfo = ({ media }) => {
  return (
    <>
      <View style={styles.infoContainer}>
        <Paragraph>{media.overview}</Paragraph>
      </View>
      <View style={styles.infoContainer}>
        <Paragraph>Home page:</Paragraph>
        <MyLink style={styles.homepage} href={media.homepage}>
          {media.homepage}
        </MyLink>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  homepage: {
    fontSize: 15,
  },
});

MediaInfo.propTypes = {
  media: PropTypes.object,
};

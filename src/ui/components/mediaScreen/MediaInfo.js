import { StyleSheet, View } from "react-native";
import React from "react";
import { Paragraph } from "../Paragraph";
import PropTypes from "prop-types";
import { MyLink } from "../commongComponents/MyLink";

export const MediaInfo = ({ media }) => {
  return (
    <>
      <View style={styles.infoContainer}>
        <Paragraph>{media.overview}</Paragraph>
      </View>
      {media.homepage && (
        <View style={styles.infoContainer}>
          <Paragraph variant="default">Home page:</Paragraph>
          <MyLink style={styles.homepage} href={media.homepage}>
            {media.homepage}
          </MyLink>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  homepage: {
    fontSize: 15,
  },
});

MediaInfo.propTypes = {
  media: PropTypes.object,
};

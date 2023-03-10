import { StyleSheet, View } from "react-native";
import React from "react";
import { Paragraph } from "../commonComponents/Paragraph";
import PropTypes from "prop-types";
import { MyLink } from "../commonComponents/MyLink";

export const MediaInfo = ({ media }) => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
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

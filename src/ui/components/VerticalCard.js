import React from "react";
import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { POSTER_RATIO, VERTICAL_POSTERS_IN_SCREEN } from "@app/utils/constants";
import PropTypes from "prop-types";
import { Paragraph } from "./Paragraph";

export const VerticalCard = ({ onPress, imageSource, title }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          source={{ uri: imageSource }}
          style={styles.image}
          resizeMode="cover"
        />
        {title && (
          <View style={styles.textContainer}>
            <Paragraph style={styles.text}>{title}</Paragraph>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const cardWidth = Dimensions.get("window").width / VERTICAL_POSTERS_IN_SCREEN;
const cardHeight = cardWidth * POSTER_RATIO;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    justifyContent: "flex-start",
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 5,
  },
  textContainer: {
    width: cardWidth - 5,
    flexDirection: "row",
    borderColor: "red",
  },
  text: {
    fontSize: 10,
    width: cardWidth,
    flex: 1,
    flexWrap: "wrap",
    textAlign: "center",
  },
});

VerticalCard.propTypes = {
  title: PropTypes.string,
  imageSource: PropTypes.string.isRequired,
  onPress: PropTypes.func,
};

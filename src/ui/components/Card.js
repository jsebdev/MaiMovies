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

export const Card = ({
  onPress,
  imageSource,
  title,
  cardRatio = POSTER_RATIO,
  horizontalCardsFit = VERTICAL_POSTERS_IN_SCREEN,
  resizeMode = "cover",
}) => {
  const cardWidth = Dimensions.get("window").width / horizontalCardsFit;
  const cardHeight = cardWidth * cardRatio;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.card}>
        <Image
          source={{ uri: imageSource }}
          style={[
            styles.image,
            {
              width: cardWidth,
              height: cardHeight,
            },
          ]}
          resizeMode={resizeMode}
        />
        {title && (
          <View
            style={[
              styles.textContainer,
              {
                width: cardWidth - 5,
              },
            ]}
          >
            <Paragraph
              style={[
                styles.text,
                {
                  width: cardWidth,
                },
              ]}
            >
              {title}
            </Paragraph>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    justifyContent: "flex-start",
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    borderRadius: 5,
  },
  textContainer: {
    flexDirection: "row",
    borderColor: "red",
  },
  text: {
    fontSize: 10,
    flex: 1,
    flexWrap: "wrap",
    textAlign: "center",
  },
});

Card.propTypes = {
  title: PropTypes.string,
  imageSource: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  cardRatio: PropTypes.number,
  horizontalCardsFit: PropTypes.number,
  resizeMode: PropTypes.string,
};

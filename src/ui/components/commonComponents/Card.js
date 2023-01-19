import React from "react";
import { View, StyleSheet, Image, Dimensions, Pressable } from "react-native";
import {
  colors,
  POSTER_RATIO,
  VERTICAL_POSTERS_IN_SCREEN,
} from "@app/utils/constants";
import PropTypes from "prop-types";
import { Paragraph } from "./Paragraph";

export const Card = ({
  onPress,
  onLongPress,
  imageSource,
  title,
  cardRatio = POSTER_RATIO,
  horizontalCardsFit = VERTICAL_POSTERS_IN_SCREEN,
  resizeMode = "cover",
  marginX = 2,
  marginB = 0,
  isSelected = false,
}) => {
  const cardWidth = Dimensions.get("window").width / horizontalCardsFit;
  // const cardHeight = cardWidth * cardRatio;
  return (
    <Pressable
      onPress={onPress ? onPress : null}
      onLongPress={onLongPress ? () => onLongPress() : null}
      style={isSelected ? styles.isSelectedCard : null}
    >
      <View
        style={[
          styles.card,
          {
            paddingHorizontal: marginX,
            marginBottom: marginB,
            width: cardWidth,
            // height: "100%",
          },
        ]}
      >
        <Image
          source={{ uri: imageSource }}
          style={[styles.image, { aspectRatio: 1 / cardRatio }]}
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
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    // flex: 1,
    justifyContent: "flex-start",
    overflow: "hidden",
    alignItems: "center",
    paddingTop: 2,
  },
  isSelectedCard: {
    backgroundColor: colors.selected,
  },
  image: {
    borderRadius: 5,
    flex: 1,
    width: "100%",
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
  marginX: PropTypes.number,
  marginB: PropTypes.number,
  onLongPress: PropTypes.func,
  isSelected: PropTypes.bool,
};

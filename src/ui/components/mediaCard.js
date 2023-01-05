import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Dimensions,
  Text,
} from "react-native";
import React from "react";
import { mediaPropType } from "@app/domain/MediaType";

const cardWidth = Dimensions.get("window").width / 3;
const cardHeight = (cardWidth * 16) / 10;

export const MediaCard = ({ media }) => {
  const goToMedia = () => {
    console.log("going to media: ", media.name);
  };
  return (
    <TouchableWithoutFeedback onPress={goToMedia}>
      <View style={styles.card}>
        <Image
          source={{ uri: media.poster.medium }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{media.name}</Text>
        </View>
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
  },
  image: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 8,
  },
  textContainer: {
    width: cardWidth,
    flexDirection: "row",
  },
  text: {
    fontSize: 10,
    width: cardWidth,
    flex: 1,
    flexWrap: "wrap",
    textAlign: "center",
  },
});

MediaCard.propTypes = {
  media: mediaPropType,
};

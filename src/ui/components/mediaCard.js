import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { mediaPropType } from "@app/domain/MediaType";

const cardWidth = Dimensions.get("window").width / 2.5;
const cardHeight = (cardWidth * 16) / 9;

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
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#0a0",
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: cardWidth,
    height: cardHeight,
  },
});

MediaCard.propTypes = {
  media: mediaPropType,
};

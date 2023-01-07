import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { mediaPropType } from "@app/domain/MediaClass";
import { IMAGES_SIZES, MOVIE_SCREEN, POSTER_RATIO } from "@app/utils/constants";
import { useNavigation } from "@react-navigation/native";
import { Paragraph } from "./Paragraph";

export const MediaCard = ({ media }) => {
  const navigation = useNavigation();
  const goToMedia = () => {
    navigation.push(MOVIE_SCREEN, {
      mediaId: media.id,
      mediaType: media.mediaType,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={goToMedia}>
      <View style={styles.card}>
        <Image
          source={{ uri: media.getPoster(IMAGES_SIZES.medium) }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Paragraph style={styles.text}>{media.name}</Paragraph>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const cardWidth = Dimensions.get("window").width / 3;
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

MediaCard.propTypes = {
  media: mediaPropType,
};

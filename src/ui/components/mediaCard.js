import {
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { mediaPropType } from "@app/domain/MediaClass";
import {
  IMAGES_SIZES,
  MEDIA_TYPES,
  MOVIE_SCREEN,
  POSTER_RATIO,
  TV_SHOW_SCREEN,
} from "@app/utils/constants";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { Paragraph } from "./Paragraph";

export const MediaCard = ({ media, mediaType }) => {
  if (!media.name) {
    console.log("no name for ", media);
  }
  const navigation = useNavigation();
  const mediaScreen =
    mediaType === MEDIA_TYPES.movie ? MOVIE_SCREEN : TV_SHOW_SCREEN;
  const goToMedia = () => {
    navigation.push(mediaScreen, {
      mediaId: media.id,
      mediaType: mediaType,
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
  mediaType: PropTypes.string.isRequired,
};

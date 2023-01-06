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
import { MOVIE_SCREEN } from "@app/utils/constants";
import { useNavigation } from "@react-navigation/native";

const cardWidth = Dimensions.get("window").width / 3;
const cardHeight = (cardWidth * 16) / 10;

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
    alignItems: "center",
  },
  image: {
    width: cardWidth,
    height: cardHeight,
    borderRadius: 5,
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

import { Dimensions } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { FlatList } from "react-native-gesture-handler";
import { useMedia } from "../hooks/media.hook";
import { Card } from "../components/Card";
import { IMAGES_SIZES } from "@app/utils/constants";
import { BackgroundView } from "../components/BackgroundView";

export const ImagesListScreen = ({ route, navigation }) => {
  const { mediaId, mediaType, imageIndex } = route.params;
  const { media } = useMedia(mediaType, mediaId);
  const cardWidth = Dimensions.get("window").width;
  console.log("14: route.name >>>", route.name);
  const goBack = () => {
    navigation.goBack();
  };
  const seasons = media.seasons.filter((season) => season.poster_path);
  return (
    <BackgroundView>
      <FlatList
        data={seasons}
        horizontal={true}
        keyExtractor={(video) => video.id}
        getItemLayout={(data, index) => {
          // console.log("24: cardWidth >>>", cardWidth);
          return {
            length: cardWidth,
            offset: cardWidth * index,
            index,
          };
        }}
        initialScrollIndex={imageIndex}
        renderItem={({ item }) => (
          <Card
            onPress={goBack}
            horizontalCardsFit={1}
            imageSource={`${media.getPosterBaseUrl(IMAGES_SIZES.large)}${
              item.poster_path
            }`}
            marginX={0}
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </BackgroundView>
  );
};

ImagesListScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      mediaId: PropTypes.number,
      mediaType: PropTypes.string,
      imageIndex: PropTypes.number,
    }),
  }),
  navigation: PropTypes.object,
};

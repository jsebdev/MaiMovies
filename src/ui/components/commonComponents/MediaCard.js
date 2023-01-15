import React from "react";
import {
  IMAGES_SIZES,
  MEDIA_SEARCH_SCREEN,
  MOVIES_TRENDING_SCREEN,
  MOVIE_SCREEN,
  SEARCH_SCREEN,
  TV_SHOW_SCREEN,
  TV_TRENDING_SCREEN,
} from "@app/utils/constants";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { Card } from "./Card";

export const MediaCard = ({ media, mediaType }) => {
  const navigation = useNavigation();
  const goToMedia = () => {
    // So far in the routes array there is only one route.
    // Beware of when there will be more routes in the routes array
    const routeName = navigation.getState().routes[0].name;
    const screenDictionary = {
      [TV_TRENDING_SCREEN]: TV_SHOW_SCREEN,
      [MOVIES_TRENDING_SCREEN]: MOVIE_SCREEN,
      [SEARCH_SCREEN]: MEDIA_SEARCH_SCREEN,
    };
    const mediaScreen = screenDictionary[routeName];
    navigation.push(mediaScreen, {
      mediaId: media.id,
      mediaType: mediaType,
    });
  };
  return (
    <Card
      onPress={goToMedia}
      imageSource={media.getPoster(IMAGES_SIZES.medium)}
      title={media.name}
    />
  );
};

MediaCard.propTypes = {
  media: PropTypes.object,
  mediaType: PropTypes.string.isRequired,
};

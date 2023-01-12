import React from "react";
import {
  IMAGES_SIZES,
  MEDIA_TYPES,
  MOVIE_SCREEN,
  TV_SHOW_SCREEN,
} from "@app/utils/constants";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { Card } from "./Card";

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

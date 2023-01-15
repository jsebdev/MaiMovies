import React from "react";
import {
  IMAGES_SIZES,
  MEDIA_NAVIGATION,
  MEDIA_SCREEN,
} from "@app/utils/constants";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { Card } from "./Card";

export const MediaCard = ({ media, mediaType }) => {
  const navigation = useNavigation();
  const goToMedia = () => {
    navigation.push(MEDIA_NAVIGATION, {
      screen: MEDIA_SCREEN,
      params: {
        mediaId: media.id,
        mediaType: mediaType,
      },
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

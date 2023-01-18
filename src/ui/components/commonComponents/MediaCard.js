import React from "react";
import {
  IMAGES_SIZES,
  MEDIA_NAVIGATION,
  MEDIA_SCREEN,
} from "@app/utils/constants";
import { useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { Card } from "./Card";

export const MediaCard = ({ media, onLongPress, onPress, isSelected }) => {
  const navigation = useNavigation();
  const goToMedia = () => {
    navigation.push(MEDIA_NAVIGATION, {
      screen: MEDIA_SCREEN,
      params: {
        mediaId: media.id,
        mediaType: media.mediaType,
        name: media.name,
      },
    });
  };
  return (
    <Card
      onPress={onPress ? onPress : goToMedia}
      imageSource={media.getPoster(IMAGES_SIZES.medium)}
      title={media.name}
      onLongPress={onLongPress}
      isSelected={isSelected}
    />
  );
};

MediaCard.propTypes = {
  media: PropTypes.object,
  onLongPress: PropTypes.func,
  onPress: PropTypes.func,
  isSelected: PropTypes.bool,
};

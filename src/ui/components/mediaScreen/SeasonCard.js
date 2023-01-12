import React from "react";
import PropTypes from "prop-types";
import { Card } from "../Card";
import { useNavigation } from "@react-navigation/native";
import { IMAGE_SCREEN } from "@app/utils/constants";

export const SeasonCard = ({
  posterUrl,
  title,
  bigPosterUrl,
  mediaId,
  mediaType,
  seasonIndex,
}) => {
  const navigation = useNavigation();
  const toggleImage = () => {
    navigation.push(IMAGE_SCREEN, {
      imageUrl: bigPosterUrl,
      mediaId,
      mediaType,
      imageIndex: seasonIndex,
    });
  };
  if (!posterUrl) return null;
  return <Card imageSource={posterUrl} title={title} onPress={toggleImage} />;
};

SeasonCard.propTypes = {
  posterUrl: PropTypes.string,
  title: PropTypes.string,
  bigPosterUrl: PropTypes.string,
  mediaId: PropTypes.number,
  mediaType: PropTypes.string,
};

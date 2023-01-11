import React from "react";
import PropTypes from "prop-types";
import { VerticalCard } from "../VerticalCard";

export const SeasonCard = ({ posterUrl, title }) => {
  if (!posterUrl) return null;
  return <VerticalCard imageSource={posterUrl} title={title} />;
};

SeasonCard.propTypes = {
  posterUrl: PropTypes.string,
};

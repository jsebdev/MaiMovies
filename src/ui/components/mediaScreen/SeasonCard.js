import React from "react";
import PropTypes from "prop-types";
import { Card } from "../Card";

export const SeasonCard = ({ posterUrl, title }) => {
  //todo: make image to show big when pressed
  if (!posterUrl) return null;
  return <Card imageSource={posterUrl} title={title} />;
};

SeasonCard.propTypes = {
  posterUrl: PropTypes.string,
  title: PropTypes.string,
};

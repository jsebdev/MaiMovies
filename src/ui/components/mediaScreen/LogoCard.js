import React from "react";
import PropTypes from "prop-types";
import { Card } from "../Card";

export const LogoCard = ({ logoUrl, title }) => {
  return (
    <Card
      imageSource={logoUrl}
      cardRatio={1}
      resizeMode="contain"
      title={title}
    />
  );
};

LogoCard.propTypes = {
  logoUrl: PropTypes.string,
  title: PropTypes.string,
};

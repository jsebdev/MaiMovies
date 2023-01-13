import { StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "@app/utils/constants";
import PropTypes from "prop-types";

export const Paragraph = ({ children, style, variant }) => {
  const inheritedStyle = Array.isArray(style) ? style : [style];
  const variantStyle = variant ? styles[variant] : null;
  return (
    <Text style={[styles.default, ...inheritedStyle, variantStyle]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    color: colors.bright,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 16,
  },
});

Paragraph.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  variant: PropTypes.oneOf(Object.keys(styles)),
};

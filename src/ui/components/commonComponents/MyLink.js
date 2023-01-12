import React from "react";
import { A } from "@expo/html-elements";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

import { Paragraph } from "./Paragraph";
import { colors } from "@app/utils/constants";

export const MyLink = ({ href, style, children }) => {
  const inheritedStyle = Array.isArray(style) ? style : [style];
  return (
    <A href={href}>
      <Paragraph style={[styles.text, ...inheritedStyle]}>{children}</Paragraph>
    </A>
  );
};

const styles = StyleSheet.create({
  text: {
    textDecorationLine: "underline",
    color: colors.link,
  },
});

MyLink.propTypes = {
  href: PropTypes.string.isRequired,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  children: PropTypes.node,
};

import { StyleSheet, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { colors } from "@app/utils/constants";

export const BackgroundView = ({ children, style }) => {
  const inheritedStyle = Array.isArray(style) ? style : [style];
  return <View style={[styles.container, ...inheritedStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    height: "100%",
    // paddingHorizontal: 4,
  },
});

BackgroundView.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

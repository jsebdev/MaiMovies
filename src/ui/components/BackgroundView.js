import { StyleSheet, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { colors } from "@app/utils/constants";

export const BackgroundView = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    // borderWidth: 0,
    // borderColor: "green",
    // height: "100%",
  },
});

BackgroundView.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

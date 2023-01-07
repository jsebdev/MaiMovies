import { StyleSheet, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { colors } from "@app/utils/constants";

export const BackgroundView = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderWidth: 0,
    borderColor: "red",
  },
});

BackgroundView.propTypes = {
  children: PropTypes.node.isRequired,
};

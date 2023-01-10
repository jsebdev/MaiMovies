import { View, Image, StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";

import { colors } from "@app/utils/constants";
import { LinearGradient } from "expo-linear-gradient";

export const Backdrop = ({ uri }) => {
  return (
    <View style={styles.backdropContainer}>
      <Image style={styles.backdrop} source={{ uri: uri }} />
      <LinearGradient
        style={styles.backdropGradient}
        colors={backdropGradient}
      />
    </View>
  );
};

const backdropGradient = [`${colors.background}80`, colors.background];
const backdropHeight = 400;

const styles = StyleSheet.create({
  backdropContainer: {
    height: backdropHeight,
    width: "100%",
    // borderColor: "green",
    borderColor: "rgb(255, 0, 0)",
    // borderWidth: 5,
    position: "absolute",
  },
  backdrop: {
    width: "100%",
    height: "100%",
    borderColor: "white",
    // borderWidth: 10,
  },
  backdropGradient: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
});

Backdrop.propTypes = {
  uri: PropTypes.string.isRequired,
};

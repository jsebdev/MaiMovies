import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { gradientCardColors } from "@app/utils/constants";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

export const LinearGradientCard = ({ children, style }) => {
  return (
    <LinearGradient style={style} colors={gradientCardColors}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

LinearGradientCard.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

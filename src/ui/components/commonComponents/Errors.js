import { View, StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { Paragraph } from "./Paragraph";
import { colors } from "@app/utils/constants";

export const Errors = ({ errors = [], style }) => {
  if (errors.length === 0) {
    return null;
  }
  return (
    <View style={style}>
      {errors.map((error, index) => (
        <Paragraph key={index} style={styles.error}>
          {error}
        </Paragraph>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.error,
    textAlign: "center",
  },
});

Errors.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.object,
};

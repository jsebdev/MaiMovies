import { StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "@app/utils/constants";
import PropTypes from "prop-types";

export const Paragraph = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: colors.text,
  },
});

Paragraph.propTypes = {
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
};

import { View, ActivityIndicator, StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";

export const FlatListLoader = ({ showSpinner = false }) => {
  return (
    <View style={styles.spinnerContainer}>
      <View style={styles.spinner}>
        {showSpinner && <ActivityIndicator size="large" />}
      </View>
    </View>
  );
};

FlatListLoader.propTypes = {
  showSpinner: PropTypes.bool,
};

const styles = StyleSheet.create({
  spinnerContainer: {
    alignItems: "center",
  },
  spinner: {
    height: 80,
    width: 80,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
});

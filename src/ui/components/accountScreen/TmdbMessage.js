import { View, StyleSheet } from "react-native";
import React from "react";
import Logo from "@assets/images/tmdb.svg";
import { Paragraph } from "@app/ui/components/commonComponents/Paragraph";
import PropTypes from "prop-types";
import { myBorder } from "@app/utils/utils";

export const TmdbMessage = ({ variant = "default" }) => {
  const tmdbSize = variant === "small" ? 40 : 60;
  const styles = variant === "small" ? smallStyles : defaultStyles;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.tmdbLogo}>
        <Logo width={tmdbSize} height={tmdbSize} />
      </View>
      <Paragraph style={styles.disclaimer}>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </Paragraph>
    </View>
  );
};

const smallStyles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tmdbLogo: {
    width: "14%",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  disclaimer: {
    width: "86%",
    fontSize: 10,
    justifyContent: "center",
    // ...myBorder(),
  },
});

const defaultStyles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  disclaimer: {
    marginHorizontal: 60,
    textAlign: "center",
    fontSize: 14,
  },
});

TmdbMessage.propTypes = {
  variant: PropTypes.string,
};

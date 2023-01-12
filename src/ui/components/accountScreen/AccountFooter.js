import { View, StyleSheet } from "react-native";
import React from "react";
import Logo from "@assets/images/tmdb.svg";
import { Paragraph } from "@app/ui/components/commonComponents/Paragraph";

export const AccountFooter = () => {
  const tmdbSize = 60;
  return (
    <View style={styles.accountFooter}>
      <View style={styles.tmdbLogo}>
        <Logo width={tmdbSize} height={tmdbSize} />
      </View>
      <Paragraph style={styles.disclaimer}>
        This product uses the TMDB API but is not endorsed or certified by TMDB.
      </Paragraph>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  mainContainer: {
    flex: 1,
  },
  tmdbLogo: {
    // backgroundColor: "#333",
    borderRadius: 5,
    padding: 5,
  },
  accountFooter: {
    height: 140,
    // paddingHorizontal: 40,
    // borderWidth: 1,
    // borderColor: "blue",
    alignItems: "center",
  },
  disclaimer: {
    width: "60%",
    textAlign: "center",
  },
});

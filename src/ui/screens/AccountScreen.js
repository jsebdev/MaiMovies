import { StyleSheet, View } from "react-native";
import React from "react";
import { BackgroundView } from "../components/BackgroundView";
import { Paragraph } from "../components/Paragraph";
import Logo from "@assets/images/tmdb.svg";
import { MyLink } from "../components/commongComponents/MyLink";
import { MyButton } from "../components/MyButton";

export const AccountScreen = ({ navigation }) => {
  const tmdbSize = 60;
  return (
    <BackgroundView style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.messageContainer}>
          <Paragraph style={styles.message}>
            All data in this application is obtained and stored in{" "}
            <MyLink
              style={styles.homepage}
              href={"https://www.themoviedb.org/"}
            >
              www.themoviedb.org
            </MyLink>
            . Hence, for you to create and edit your lists, you&apos;ll have to
            have an account in TMDB.
          </Paragraph>
          <MyButton>Access to my TMDB account</MyButton>
        </View>
      </View>
      <View style={styles.accountFooter}>
        <View style={styles.tmdbLogo}>
          <Logo width={tmdbSize} height={tmdbSize} />
        </View>
        <Paragraph style={styles.disclaimer}>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </Paragraph>
      </View>
    </BackgroundView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  message: {
    // borderColor: "red",
    // borderWidth: 1,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  mainContainer: {
    flex: 1,
  },
  messageContainer: {
    alignItems: "center",
    marginTop: 50,
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

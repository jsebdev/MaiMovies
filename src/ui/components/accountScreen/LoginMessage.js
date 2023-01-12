import { View, StyleSheet } from "react-native";
import React from "react";
import { MyButton } from "../commonComponents/MyButton";
import { MyLink } from "../commonComponents/MyLink";
import { Paragraph } from "../commonComponents/Paragraph";

export const LoginMessage = () => {
  return (
    <View style={styles.messageContainer}>
      <Paragraph style={styles.message}>
        All data in this application is obtained and stored in{" "}
        <MyLink href={"https://www.themoviedb.org/"}>www.themoviedb.org</MyLink>
        . Hence, for you to create and edit your lists, you&apos;ll have to have
        an account in TMDB.
      </Paragraph>
      <MyButton>Access to my TMDB account</MyButton>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    paddingHorizontal: 20,
  },
  messageContainer: {
    alignItems: "center",
    marginTop: 50,
  },
});

import { View, StyleSheet, Linking, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { MyButton } from "../commonComponents/MyButton";
import { MyLink } from "../commonComponents/MyLink";
import { Paragraph } from "../commonComponents/Paragraph";
import { useStore } from "@app/store/store.hook";

export const LoginMessage = () => {
  const { userStore } = useStore();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const getAccess = async () => {
    setErrorMessage(null);
    setLoading(true);
    const result = await userStore.createNewToken();
    if (!result.success) {
      if (result.message) setErrorMessage(result.message);
      else setErrorMessage("Sorry, something went wrong");
      setLoading(false);
      return;
    }
    const authorizationLink = userStore.authenticateTokenLink;
    const supportedLink = await Linking.canOpenURL(authorizationLink);
    if (supportedLink) {
      Linking.openURL(authorizationLink);
      userStore.periodicCreateSession();
    } else {
      console.error("Link is not supported to open ", authorizationLink);
    }
    setLoading(false);
  };
  return (
    <View style={styles.messageContainer}>
      <Paragraph style={styles.message}>
        All data in this application is obtained and stored in{" "}
        <MyLink href={"https://www.themoviedb.org/"}>www.themoviedb.org</MyLink>
        . Hence, for you to create and edit your lists, you&apos;ll have to have
        an account in TMDB.
      </Paragraph>
      <MyButton rootStyle={{ marginVertical: 10 }} onPress={getAccess}>
        Access to my TMDB account
      </MyButton>
      {errorMessage && <Paragraph>{errorMessage}</Paragraph>}
      {loading && <ActivityIndicator size="large" />}
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

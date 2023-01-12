import { StyleSheet, View } from "react-native";
import React from "react";
import { BackgroundView } from "@app/ui/components/commonComponents/BackgroundView";
import { LoginMessage } from "@components/accountScreen/LoginMessage";
import { AccountFooter } from "@components/accountScreen/AccountFooter";

export const AccountScreen = ({ navigation }) => {
  return (
    <BackgroundView style={styles.container}>
      <View style={styles.mainContainer}>
        <LoginMessage />
      </View>
      <AccountFooter />
    </BackgroundView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  mainContainer: {
    flex: 1,
  },
});

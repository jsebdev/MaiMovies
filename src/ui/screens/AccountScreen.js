import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { BackgroundView } from "@app/ui/components/commonComponents/BackgroundView";
import { LoginMessage } from "@components/accountScreen/LoginMessage";
import { TmdbMessage } from "@app/ui/components/accountScreen/TmdbMessage";
import { useStore } from "@app/store/store.hook";
import { observer } from "mobx-react-lite";
import { AccountDetails } from "../components/accountScreen/AccountDetails";

export const AccountScreen = observer(({ navigation }) => {
  const { userStore } = useStore();
  return (
    <BackgroundView style={styles.container}>
      {userStore.sessionId ? <AccountDetails /> : <LoginMessage />}
      {/* <MyButton onPress={() => navigation.push("test")}>go to test</MyButton> */}
    </BackgroundView>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
});

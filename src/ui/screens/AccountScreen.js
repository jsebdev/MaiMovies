import { StyleSheet } from "react-native";
import React from "react";
import { useStore } from "@app/store/store.hook";
import { observer } from "mobx-react-lite";

import { BackgroundView } from "@app/ui/components/commonComponents/BackgroundView";
import { LoginMessage } from "@components/accountScreen/LoginMessage";
import { AccountDetails } from "../components/accountScreen/AccountDetails";

export const AccountScreen = observer(() => {
  const { userStore } = useStore();
  return (
    <BackgroundView style={styles.container}>
      {userStore.sessionId ? <AccountDetails /> : <LoginMessage />}
    </BackgroundView>
  );
});

const styles = StyleSheet.create({
  container: {},
});

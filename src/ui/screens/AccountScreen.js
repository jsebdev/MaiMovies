import { StyleSheet, View } from "react-native";
import React from "react";
import { BackgroundView } from "@app/ui/components/commonComponents/BackgroundView";
import { LoginMessage } from "@components/accountScreen/LoginMessage";
import { AccountFooter } from "@components/accountScreen/AccountFooter";
import { useStore } from "@app/store/store.hook";
import { observer } from "mobx-react-lite";
import { MyButton } from "../components/commonComponents/MyButton";

export const AccountScreen = observer(() => {
  const { userStore } = useStore();
  return (
    <BackgroundView style={styles.container}>
      <View style={styles.mainContainer}>
        {userStore.session ? (
          <MyButton onPress={() => userStore.deleteSession()}>
            Close TMDB session
          </MyButton>
        ) : (
          <LoginMessage />
        )}
      </View>
      <AccountFooter />
    </BackgroundView>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  mainContainer: {
    flex: 1,
  },
});

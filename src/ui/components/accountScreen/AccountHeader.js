import { View, Image, StyleSheet } from "react-native";
import React from "react";
import { Paragraph } from "../commonComponents/Paragraph";
import { observer } from "mobx-react-lite";
import { useStore } from "@app/store/store.hook";
import { MyButton } from "../commonComponents/MyButton";
import { TmdbMessage } from "./TmdbMessage";

export const AccountHeader = observer(() => {
  const { userStore } = useStore();
  return (
    <View style={styles.mainContainer}>
      <TmdbMessage variant="small" />
      <Image style={styles.avatar} source={{ uri: userStore.avatar }} />
      <Paragraph style={styles.name}>{userStore.name}</Paragraph>
      <Paragraph style={styles.username}>{userStore.username}</Paragraph>
      <MyButton
        rootStyle={styles.closeSessionButton}
        onPress={() => {
          userStore.deleteSession();
        }}
      >
        Close TMDB session
      </MyButton>
    </View>
  );
});

const avatarSize = 100;

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
  },
  avatar: {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    marginVertical: 20,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  closeSessionButton: {
    marginVertical: 20,
  },
});

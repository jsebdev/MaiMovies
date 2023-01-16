import React, { useEffect } from "react";
import { useStore } from "@app/store/store.hook";
import { MyButton } from "../commonComponents/MyButton";
import { Image, StyleSheet, View } from "react-native";
import { Paragraph } from "../commonComponents/Paragraph";
import { observer } from "mobx-react-lite";
import { ListSection } from "./ListSection";

export const AccountDetails = observer(() => {
  const { userStore } = useStore();
  useEffect(() => {
    (async () => {
      await userStore.fetchAccountDetails();
      await userStore.fetchListsNextPage();
    })();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{ uri: userStore.avatar }} />
        <Paragraph style={styles.name}>{userStore.name}</Paragraph>
        <Paragraph style={styles.username}>{userStore.username}</Paragraph>
        <ListSection />
      </View>
      <MyButton
        onPress={() => {
          console.log("bam se borro!");
          userStore.deleteSession();
        }}
      >
        Close TMDB session
      </MyButton>
    </View>
  );
});

const avatarSize = 90;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  avatarContainer: {
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
    flex: 1,
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
});

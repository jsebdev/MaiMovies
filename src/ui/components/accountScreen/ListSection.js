import { View, StyleSheet } from "react-native";
import React from "react";
import { Paragraph } from "../commonComponents/Paragraph";
import { observer } from "mobx-react-lite";
import { useStore } from "@app/store/store.hook";
import { MyButton } from "../commonComponents/MyButton";
import { ListsList } from "./ListsList";

export const ListSection = observer(() => {
  const { userStore } = useStore();
  const lists = Array.from(userStore.lists.values());
  return (
    <View style={styles.container}>
      <Paragraph variant="title" style={styles.title}>
        Your lists
      </Paragraph>
      {lists.length > 0 ? (
        <ListsList list={lists} />
      ) : (
        <>
          <Paragraph style={styles.message}>
            You don&apos;t have lists yet
          </Paragraph>
          <MyButton>Create your first list</MyButton>
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    paddingVertical: 20,
    // borderWidth: 1,
    // borderColor: "red",
    width: "100%",
    paddingHorizontal: 10,
  },
  title: {
    marginBottom: 10,
  },
  message: {
    textAlign: "center",
    marginVertical: 20,
  },
});

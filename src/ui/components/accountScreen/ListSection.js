import { View, StyleSheet } from "react-native";
import React from "react";
import { Paragraph } from "../commonComponents/Paragraph";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import { MyButton } from "../commonComponents/MyButton";
import { useNavigation } from "@react-navigation/native";
import { NEW_LIST_SCREEN } from "@app/utils/constants";

export const ListSection = observer(({ listLength }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Paragraph variant="title" style={styles.title}>
          Your lists:
        </Paragraph>
        <MyButton onPress={() => navigation.push(NEW_LIST_SCREEN)}>
          New List
        </MyButton>
      </View>
      {listLength === 0 && (
        <>
          <Paragraph style={styles.message}>
            You don&apos;t have lists yet
          </Paragraph>
          {/* todo: add functionality to this button */}
          <MyButton>Create your first list</MyButton>
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    // ...myBorder(),
  },
  title: {
    flex: 1,
    // ...myBorder(),
  },
  message: {
    textAlign: "center",
    marginVertical: 20,
  },
});

ListSection.propTypes = {
  listLength: PropTypes.number,
};

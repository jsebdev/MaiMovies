import { View, StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { Paragraph } from "../commonComponents/Paragraph";
import { LinearGradient } from "expo-linear-gradient";
import { gradientCardColors } from "@app/utils/constants";

export const ListItem = ({ list }) => {
  console.log("7: list >>>", list);
  return (
    <View style={styles.container}>
      <LinearGradient style={styles.linearGradient} colors={gradientCardColors}>
        <Paragraph style={styles.listName}>{list.name}</Paragraph>
        <Paragraph style={styles.itemCount}>
          {list.itemCount} item{list.itemCount !== 1 && "s"}
        </Paragraph>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    aspectRatio: 5 / 4,
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  linearGradient: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  listName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  itemCount: {
    fontSize: 16,
  },
});

ListItem.propTypes = {
  list: PropTypes.object,
};

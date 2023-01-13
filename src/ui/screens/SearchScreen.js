import React, { useRef, useState } from "react";
import View from "@expo/html-elements/build/primitives/View";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Paragraph } from "../components/commonComponents/Paragraph";
import { BackgroundView } from "../components/commonComponents/BackgroundView";
import { colors } from "@app/utils/constants";
import { StyleSheet, TextInput } from "react-native";

export const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const search = () => {
    console.log("13: searchText >>>", searchText);
  };
  return (
    <BackgroundView>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
        />
        <Ionicons
          name="search"
          color={colors.dimmed}
          size={30}
          style={styles.searchButton}
          onPress={search}
        />
      </View>
    </BackgroundView>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderColor: colors.bright,
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 8,
    flexDirection: "row",
  },
  input: {
    flex: 1,
    color: colors.bright,
    fontSize: 20,
    paddingHorizontal: 10,
  },
  searchButton: {
    marginHorizontal: 10,
  },
});

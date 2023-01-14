import { View } from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { StyleSheet, TextInput } from "react-native";
import { colors } from "@app/utils/constants";
import PropTypes from "prop-types";

export const Searcher = ({ search }) => {
  const [searchText, setSearchText] = useState("");
  const handleSearch = () => {
    if (searchText.length > 0) {
      search(searchText);
    }
  };
  //todo: make searcher search when click or press enter
  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
      />
      <Entypo
        name="cross"
        color={colors.dimmed}
        size={30}
        style={styles.searchButton}
        onPress={() => setSearchText("")}
      />
      <Ionicons
        name="search"
        color={colors.dimmed}
        size={30}
        style={styles.searchButton}
        onPress={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    borderColor: colors.bright,
    borderWidth: 2,
    borderRadius: 8,
    paddingVertical: 8,
    flexDirection: "row",
    marginHorizontal: 10,
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
  resultsContainer: {
    marginTop: 20,
  },
  listContainer: {
    marginBottom: 30,
  },
  message: {
    textAlign: "center",
    marginBottom: 30,
  },
  sectionTitle: {
    marginBottom: 10,
    marginLeft: 10,
  },
});

Searcher.propTypes = {
  search: PropTypes.func,
};

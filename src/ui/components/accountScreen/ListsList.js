import { FlatList } from "react-native";
import React from "react";
import { FlatListLoader } from "../commonComponents/FlatListLoader";
import PropTypes from "prop-types";
import { ListItem } from "./ListItem";
import { Paragraph } from "../commonComponents/Paragraph";

export const ListsList = ({ list, loadMoreData, showSpinner = false }) => {
  return (
    <FlatList
      data={list}
      keyExtractor={(list) => list.id}
      renderItem={({ item }) => <ListItem list={item} />}
      numColumns={2}
      onEndReached={loadMoreData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={<FlatListLoader showSpinner={showSpinner} />}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  );
};

ListsList.propTypes = {
  list: PropTypes.array,
  loadMoreData: PropTypes.func,
  showSpinner: PropTypes.bool,
};

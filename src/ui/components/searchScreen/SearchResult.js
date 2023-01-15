import React from "react";
import { Paragraph } from "@components/commonComponents/Paragraph";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { MediaList } from "@components/commonComponents/MediaList";
import PropTypes from "prop-types";

export const SearchResult = ({
  list,
  pendingResults,
  loadMoreResults,
  resultTitle,
  mediaType,
}) => {
  return (
    <View style={styles.listContainer}>
      {resultTitle && (
        <Paragraph variant="title" style={styles.sectionTitle}>
          {resultTitle}
        </Paragraph>
      )}
      {list.length > 0 ? (
        <MediaList
          mediaList={list}
          mediaType={mediaType}
          horizontal={true}
          loadNewData={loadMoreResults}
          showSpinner={pendingResults > 0}
        />
      ) : (
        <>
          {pendingResults > 0 ? (
            <ActivityIndicator />
          ) : (
            <Paragraph style={styles.message}>No movies found.</Paragraph>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

SearchResult.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
  pendingResults: PropTypes.number.isRequired,
  loadMoreResults: PropTypes.func,
  resultTitle: PropTypes.string,
  mediaType: PropTypes.string,
};

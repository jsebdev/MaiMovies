import React from "react";
import { Paragraph } from "@components/commonComponents/Paragraph";
import { MEDIA_TYPES } from "@app/utils/constants";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { MediaList } from "@components/commonComponents/MediaList";
import PropTypes from "prop-types";

export const SearchResult = ({ list, pendingResults, loadMoreResults }) => {
  return (
    <View style={styles.listContainer}>
      <Paragraph variant="title" style={styles.sectionTitle}>
        Movies:
      </Paragraph>
      {list.length > 0 ? (
        <MediaList
          mediaList={list}
          mediaType={MEDIA_TYPES.movie}
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
};

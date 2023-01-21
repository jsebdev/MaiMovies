import React from "react";

import { Paragraph } from "../components/commonComponents/Paragraph";
import { BackgroundView } from "../components/commonComponents/BackgroundView";
import { MEDIA_TYPES } from "@app/utils/constants";
import { StyleSheet, View } from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "@app/store/store.hook";
import { Searcher } from "../components/searchScreen/Searcher";
import { SearchResult } from "../components/searchScreen/SearchResult";

export const SearchScreen = observer(() => {
  const { searchStore, search, fetchNewMovies, fetchNewTvShows } = useSearch();
  return (
    <BackgroundView>
      <Searcher search={search} />
      {searchStore.searchText && (
        <View style={styles.resultsContainer}>
          <Paragraph style={styles.message}>
            Search results for &rdquo;{searchStore.searchText}&rdquo;
          </Paragraph>
          <SearchResult
            list={Array.from(searchStore.movies.list.values())}
            pendingResults={searchStore.pendingResults}
            loadMoreResults={fetchNewMovies}
            resultTitle="Movies:"
            noResultMessage="No Movies found"
          />
          <SearchResult
            list={Array.from(searchStore.tv.list.values())}
            pendingResults={searchStore.pendingResults}
            loadMoreResults={fetchNewTvShows}
            resultTitle="Tv shows:"
            noResultMessage="No TV shows found"
          />
        </View>
      )}
    </BackgroundView>
  );
});

const styles = StyleSheet.create({
  resultsContainer: {
    marginTop: 20,
  },
  message: {
    textAlign: "center",
    marginBottom: 30,
  },
});

const useSearch = () => {
  const { searchStore } = useStore();
  const search = (text) => {
    searchStore.searchText = text;
    fetchNewMovies();
    fetchNewTvShows();
  };
  const fetchNewMovies = () => {
    searchStore.fetchNextPageMediaSearch(MEDIA_TYPES.movie);
  };
  const fetchNewTvShows = () => {
    searchStore.fetchNextPageMediaSearch(MEDIA_TYPES.tv);
  };
  return { searchStore, search, fetchNewMovies, fetchNewTvShows };
};

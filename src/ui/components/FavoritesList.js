import React, { useEffect } from "react";
import { MediaList } from "./commonComponents/MediaList";
import { useStore } from "@app/store/store.hook";
import { observer } from "mobx-react-lite";
import { MEDIA_TYPES } from "@app/utils/constants";
import { Paragraph } from "./commonComponents/Paragraph";
import { StyleSheet } from "react-native";

export const FavoritesList = observer(({ mediaType }) => {
  const { media, loadNextPageFavoriteMedia, userStore } =
    useFavoriteMedia(mediaType);
  return (
    <>
      {userStore.sessionId ? (
        <>
          {media.list.size > 0 ? (
            <MediaList
              mediaList={Array.from(media.list.values())}
              loadNewData={loadNextPageFavoriteMedia}
              showSpinner={media.page < media.totalPages}
            />
          ) : (
            <Paragraph style={styles.message}>
              You don&apos;t have any favorite
              {mediaType === MEDIA_TYPES.movie ? " movie" : " tv show"} yet
            </Paragraph>
          )}
        </>
      ) : (
        <Paragraph style={styles.message}>
          Login to your account to see your favorite{" "}
          {mediaType === MEDIA_TYPES.movie ? "movies" : "tv shows"} here.
        </Paragraph>
      )}
    </>
  );
});

const useFavoriteMedia = (mediaType) => {
  const { userStore } = useStore();
  const loadNextPageFavoriteMedia = () => {
    try {
      userStore.fetchNextPageFavorites(mediaType);
    } catch (error) {
      console.error(error);
    }
  };
  const media =
    mediaType === MEDIA_TYPES.movie
      ? userStore.favoritesMovies
      : userStore.favoritesTvShows;
  useEffect(() => {
    if (userStore.sessionId && media.list.size === 0) {
      (async () => loadNextPageFavoriteMedia())();
    }
  }, []);

  return { media, loadNextPageFavoriteMedia, userStore };
};

const styles = StyleSheet.create({
  message: {
    textAlign: "center",
    marginTop: 100,
    marginHorizontal: 20,
    fontSize: 18,
  },
});

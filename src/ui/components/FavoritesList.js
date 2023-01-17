import React, { useEffect } from "react";
import { MediaList } from "./commonComponents/MediaList";
import { useStore } from "@app/store/store.hook";
import { observer } from "mobx-react-lite";
import { MEDIA_TYPES } from "@app/utils/constants";
import { Paragraph } from "./commonComponents/Paragraph";

export const FavoritesList = observer(({ mediaType }) => {
  const { media, loadNextPageFavoriteMedia } = useFavoriteMedia(mediaType);
  return (
    <>
      {media.list.size > 0 ? (
        <MediaList
          mediaList={Array.from(media.list.values())}
          loadNewData={loadNextPageFavoriteMedia}
          showSpinner={media.page < media.totalPages}
        />
      ) : (
        <Paragraph>
          You don&apos;t have any favorite{" "}
          {mediaType === MEDIA_TYPES.movie ? "movie" : "tv show"} yet
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
    if (media.list.size === 0) {
      (async () => loadNextPageFavoriteMedia())();
    }
  }, []);

  return { media, loadNextPageFavoriteMedia };
};

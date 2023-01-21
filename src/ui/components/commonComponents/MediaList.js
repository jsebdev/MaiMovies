import { FlatList } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { MediaCard } from "./MediaCard";
import { FlatListLoader } from "./FlatListLoader";

export const MediaList = ({
  mediaList,
  loadNewData,
  showSpinner,
  horizontal = false,
  selectedMedia,
  setSelectedMedia,
  headerComponent,
}) => {
  const composeUniqueMediaId = ({ id, mediaType }) => `${mediaType}${id}`;
  const toggleMediaSelection = (media) => {
    if (isMediaSelected(media)) {
      setSelectedMedia((medias) =>
        medias.filter((item) => item.uniqueId !== composeUniqueMediaId(media))
      );
      return;
    }
    setSelectedMedia((values) => [
      ...values,
      {
        id: media.id,
        mediaType: media.mediaType,
        uniqueId: composeUniqueMediaId(media),
      },
    ]);
  };
  const isMediaSelected = (media) => {
    if (!selectedMedia) return false;
    const selected = selectedMedia.find(
      (item) => item.uniqueId === composeUniqueMediaId(media)
    );
    if (selected) return true;
    return false;
  };

  return (
    <FlatList
      data={mediaList}
      keyExtractor={(media) => `${media.mediaType}${media.id}`}
      renderItem={({ item }) => (
        <MediaCard
          media={item}
          onLongPress={selectedMedia ? () => toggleMediaSelection(item) : null}
          onPress={
            selectedMedia && selectedMedia.length > 0
              ? () => toggleMediaSelection(item)
              : null
          }
          isSelected={isMediaSelected ? isMediaSelected(item) : false}
        />
      )}
      horizontal={horizontal}
      numColumns={!horizontal && 3}
      onEndReached={loadNewData}
      onEndReachedThreshold={0.5}
      ListFooterComponent={<FlatListLoader showSpinner={showSpinner} />}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={headerComponent}
    />
  );
};

MediaList.propTypes = {
  mediaList: PropTypes.array.isRequired,
  loadNewData: PropTypes.func,
  showSpinner: PropTypes.bool,
  horizontal: PropTypes.bool,
  selectedMedia: PropTypes.array,
  setSelectedMedia: PropTypes.func,
  headerComponent: PropTypes.node,
};

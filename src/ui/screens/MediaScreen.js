import React from "react";
import PropTypes from "prop-types";

import { BackgroundView } from "@components/BackgroundView";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { observer } from "mobx-react-lite";
import { MediaVideos } from "@components/mediaScreen/MediaVideos";
import { useMediaScreen } from "@hooks/media.hook";
import { Backdrop } from "../components/mediaScreen/Backdrop";
import { IMAGES_SIZES, MEDIA_TYPES } from "@app/utils/constants";
import { MediaHeader } from "../components/mediaScreen/MediaHeader";
import { MediaInfo } from "../components/mediaScreen/MediaInfo";
import { ScrollView } from "react-native-gesture-handler";
import { TvSeasons } from "../components/mediaScreen/TvSeasons";

export const MediaScreen = observer(({ route }) => {
  const { mediaType, mediaId } = route.params;

  const { media } = useMediaScreen(mediaType, mediaId);
  console.log("20: media >>>", media);

  return (
    <BackgroundView>
      {media ? (
        <ScrollView style={styles.container}>
          <Backdrop uri={media.getBackdrop(IMAGES_SIZES.large)}></Backdrop>
          <View style={styles.headerSpace} />
          <View style={styles.dataContainer}>
            <MediaHeader media={media} />
            <MediaInfo media={media} />
            <MediaVideos mediaType={media.mediaType} mediaId={mediaId} />
            {media.mediaType === MEDIA_TYPES.tv && <TvSeasons media={media} />}
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator style={styles.spinner} />
      )}
    </BackgroundView>
  );
});

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    // borderWidth: 1,
  },
  headerSpace: {
    height: 100,
  },
  dataContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: "white",
    marginBottom: 500,
    // borderWidth: 1,
  },
  spinner: {
    marginTop: 60,
    marginBottom: 60,
  },
});

MediaScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      mediaId: PropTypes.number,
      mediaType: PropTypes.string,
    }),
  }),
};

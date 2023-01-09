import React from "react";
import PropTypes from "prop-types";

import { BackgroundView } from "@components/BackgroundView";
import { StyleSheet, View } from "react-native";
import { observer } from "mobx-react-lite";
import { MediaVideos } from "@components/mediaScreen/MediaVideos";
import { useMediaScreen } from "@hooks/media.hook";
import { Paragraph } from "../components/Paragraph";
import { Backdrop } from "../components/mediaScreen/Backdrop";
import { IMAGES_SIZES } from "@app/utils/constants";
import { MediaHeader } from "../components/mediaScreen/MediaHeader";
import { MediaInfo } from "../components/mediaScreen/MediaInfo";
import { ScrollView } from "react-native-gesture-handler";

export const MediaScreen = observer(({ route }) => {
  const { mediaType, mediaId } = route.params;

  // const { media } = useMediaScreen(mediaType, mediaId);
  const { media } = useMediaScreen(mediaType, mediaId);

  return (
    <BackgroundView>
      {media ? (
        <ScrollView style={styles.container}>
          <Backdrop uri={media.getBackdrop(IMAGES_SIZES.large)}></Backdrop>
          <View style={styles.headerSpace} />
          <View style={styles.dataContainer}>
            <MediaHeader media={media} />
            <MediaInfo media={media} />
            <MediaVideos mediaType={mediaType} mediaId={mediaId} />
          </View>
        </ScrollView>
      ) : (
        <Paragraph>No media yet</Paragraph>
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
});

MediaScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      mediaId: PropTypes.number,
      mediaType: PropTypes.string,
    }),
  }),
};

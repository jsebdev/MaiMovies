import React, { useEffect } from "react";
import PropTypes from "prop-types";

import { useNavigation } from "@react-navigation/native";
import { MediaHeader } from "@components/MediaHeader";
import { BackgroundView } from "@components/BackgroundView";
import { MediaInfo } from "@components/mediaScreen/MediaInfo";
import { Backdrop } from "../components/mediaScreen/Backdrop";
import { IMAGES_SIZES } from "@app/utils/constants";
import { StyleSheet, View } from "react-native";
import { useStore } from "@app/store/useStores";
import { observer } from "mobx-react-lite";

export const MediaScreen = observer(({ route }) => {
  const { mediaType, mediaId } = route.params;

  const { media } = useMediaScreen(mediaType, mediaId);

  return (
    <BackgroundView>
      {media && (
        <>
          <Backdrop uri={media.getBackdrop(IMAGES_SIZES.large)}></Backdrop>
          <View style={styles.dataContainer}>
            <MediaHeader media={media} />
            <MediaInfo media={media} />
          </View>
        </>
      )}
    </BackgroundView>
  );
});

const styles = StyleSheet.create({
  dataContainer: {
    top: 100,
    paddingLeft: 20,
    paddingRight: 20,
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

const useMediaScreen = (mediaType, mediaId) => {
  const navigation = useNavigation();
  const { mediaStore } = useStore();
  const media = mediaStore.getMedia(mediaType, mediaId);

  useEffect(() => {
    navigation.setOptions({ title: media?.name });
    if (media) {
      return;
    }
    mediaStore.fetchMedia(mediaType, mediaId);
  }, [mediaId, mediaType, media]);

  return { media };
};

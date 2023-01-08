import React, { useEffect, useState } from "react";
import { apiController } from "@app/api/apiController";
import PropTypes from "prop-types";

import { useNavigation } from "@react-navigation/native";
import { MediaHeader } from "@components/MediaHeader";
import { BackgroundView } from "@components/BackgroundView";
import { MediaInfo } from "@components/mediaScreen/MediaInfo";
import { Backdrop } from "../components/mediaScreen/Backdrop";
import { IMAGES_SIZES } from "@app/utils/constants";
import { StyleSheet, View } from "react-native";

export const MediaScreen = ({ route }) => {
  const { mediaId, mediaType } = route.params;
  const navigation = useNavigation();
  const [media, setMedia] = useState(null);
  useEffect(() => {
    (async () => {
      const result = await apiController.getMedia(mediaId, mediaType);
      if (!result.success) {
        return;
      }
      setMedia(result.value);
      navigation.setOptions({ title: result.value.name });
    })();
  }, [mediaId]);

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
};

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

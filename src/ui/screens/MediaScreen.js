import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { apiController } from "@app/api/apiController";
import PropTypes from "prop-types";
import { useNavigation } from "@react-navigation/native";
import { MediaHeader } from "@components/MediaHeader";

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

  return <View>{media && <MediaHeader media={media} />}</View>;
};

MediaScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      mediaId: PropTypes.number,
      mediaType: PropTypes.string,
    }),
  }),
};

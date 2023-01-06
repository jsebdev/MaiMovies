import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { apiController } from "@app/api/apiController";
import PropTypes from "prop-types";

export const MediaScreen = ({ route }) => {
  const { mediaId, mediaType } = route.params;
  const [media, setMedia] = useState(null);
  useEffect(() => {
    (async () => {
      const result = await apiController.getMedia(mediaId, mediaType);
      if (!result.success) {
        return;
      }
      setMedia(result.value);
    })();
  }, [mediaId]);
  return <View>{media && <Text>{media.name}</Text>}</View>;
};

MediaScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      mediaId: PropTypes.number,
      mediaType: PropTypes.string,
    }),
  }),
};

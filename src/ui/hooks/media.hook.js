import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "@app/store/store.hook";

export const useMedia = (mediaType, mediaId) => {
  const { mediaStore } = useStore();
  const media = mediaStore.getMedia(mediaType, mediaId);
  return { media, mediaStore };
};

export const useMediaScreen = (mediaType, mediaId) => {
  const navigation = useNavigation();
  const { media, mediaStore } = useMedia(mediaType, mediaId);

  useEffect(() => {
    navigation.setOptions({ title: media?.name });
    if (media) {
      return;
    }
    mediaStore.fetchMedia(mediaType, mediaId);
  }, [mediaId, mediaType, media]);

  return { media, mediaStore };
};

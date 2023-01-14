import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import { observer } from "mobx-react-lite";
import { useMedia } from "@hooks/media.hook";
import { Paragraph } from "../commonComponents/Paragraph";
import { HorizontalThumbnail } from "./HorizontalThumbnail";
import { VideoImage } from "./VideoImage";

export const MediaVideos = observer(({ mediaType, mediaId }) => {
  const { mediaStore } = useMedia(mediaType, mediaId);
  const videos = mediaStore.medias[mediaType].get(mediaId).videos;
  const youtubeVideos = videos.filter((video) => video.site === "YouTube");
  const otherVideos = videos.filter((video) => video.site !== "YouTube");

  React.useEffect(() => {
    if (videos.length > 0) {
      return;
    }
    mediaStore.fetchMediaVideos(mediaType, mediaId);
  }, []);

  return (
    <View style={styles.container}>
      {youtubeVideos.length > 0 && (
        <>
          <Paragraph variant="title">Videos</Paragraph>
          <FlatList
            data={youtubeVideos}
            horizontal={true}
            keyExtractor={(video) => video.id}
            renderItem={({ item }) => (
              <HorizontalThumbnail video={item} title={item.name}>
                <VideoImage video={item} />
              </HorizontalThumbnail>
            )}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
      {otherVideos.length > 0 && (
        <>
          <Paragraph>Other Videos:</Paragraph>
          <FlatList
            data={otherVideos}
            horizontal={true}
            keyExtractor={(video) => video.id}
            renderItem={({ item }) => <Paragraph>{item.name}</Paragraph>}
            showsHorizontalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
});

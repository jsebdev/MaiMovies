import { FlatList, Platform, StyleSheet, View } from "react-native";
import React from "react";
import { observer } from "mobx-react-lite";
import { useMedia } from "@hooks/media.hook";
import { Paragraph } from "../Paragraph";
import { VideoThumbnail } from "./VideoThumbnail";

export const MediaVideos = observer(({ mediaType, mediaId }) => {
  const { mediaStore } = useMedia(mediaType, mediaId);
  const videos = mediaStore.medias[mediaType][mediaId].videos;
  const youtubeVideos = videos.filter((video) => video.site === "YouTube");
  const otherVideos = videos.filter((video) => video.site !== "YouTube");

  React.useEffect(() => {
    console.log("15: Platform.OS >>>", Platform.OS);
    // console.log("11: media >>>", mediaStore.medias[mediaType][mediaId]);
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
            renderItem={({ item }) => <VideoThumbnail video={item} />}
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
      {/* <Button
        title="print media"
        onPress={() => {
          console.log("37: media >>>", mediaStore.medias[mediaType][mediaId]);
        }}
      /> */}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
  },
});

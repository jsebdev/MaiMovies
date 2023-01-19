import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Paragraph } from "../commonComponents/Paragraph";
import { SCENE_RATIO } from "@app/utils/constants";
import { Score } from "../commonComponents/Score";
import { formatDuration } from "date-fns";
import PropTypes from "prop-types";
import { MyButton } from "../commonComponents/MyButton";

export const LastEpisodeInfo = ({ lastEpisode, imageBaseUrl }) => {
  const [showInfo, setShowInfo] = useState(false);
  if (!lastEpisode) return null;
  return (
    <View style={styles.container}>
      <MyButton
        onPress={() => {
          setShowInfo((v) => !v);
        }}
        containerStyle={styles.buttonContainer}
        color="white"
      >
        {showInfo ? "Hide last episode info" : "Show last episode info"}
      </MyButton>
      {showInfo && (
        <>
          <Image
            source={{ uri: `${imageBaseUrl}${lastEpisode.still_path}` }}
            style={styles.still}
          />
          <View style={styles.middleContainer}>
            <View style={styles.leftContainer}>
              {lastEpisode.name && (
                <Paragraph style={styles.title}>
                  Title: {lastEpisode.name}
                </Paragraph>
              )}
              {lastEpisode.episode_number !== undefined && (
                <Paragraph style={styles.title}>
                  Episode: {lastEpisode.episode_number}
                </Paragraph>
              )}
              {lastEpisode.season_number !== undefined && (
                <Paragraph style={styles.title}>
                  Season: {lastEpisode.season_number}
                </Paragraph>
              )}
              {lastEpisode.runtime !== undefined && (
                <Paragraph style={styles.title}>
                  Runtime:{" "}
                  {formatDuration({
                    hours: Math.floor(lastEpisode.runtime / 60),
                    minutes: lastEpisode.runtime % 60,
                  })}
                </Paragraph>
              )}
            </View>
            {lastEpisode.vote_average !== undefined && (
              <Score score={lastEpisode.vote_average} />
            )}
          </View>
          <Paragraph style={styles.overview}>{lastEpisode.overview}</Paragraph>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  still: {
    width: "100%",
    aspectRatio: 1 / SCENE_RATIO,
  },
  title: {
    textAlign: "center",
  },
  overview: {
    marginTop: 10,
  },
  middleContainer: {
    flexDirection: "row",
    // borderWidth: 1,
    borderColor: "white",
    // justifyContent: "center",
    alignItems: "center",
  },
  leftContainer: {
    flex: 1,
    // borderWidth: 1,
    borderColor: "white",
  },
  buttonContainer: {
    marginBottom: 10,
  },
});

LastEpisodeInfo.propTypes = {
  lastEpisode: PropTypes.object,
  imageBaseUrl: PropTypes.string,
};

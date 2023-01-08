import { View, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import {
  colors,
  IMAGES_SIZES,
  POSTER_RATIO,
  VOTE_COLORS,
  VOTE_COLORS_VALUES,
} from "@app/utils/constants";
import { LinearGradient } from "expo-linear-gradient";
import { Paragraph } from "./Paragraph";
import { format, formatDuration } from "date-fns";
import { currencyFormatter } from "@app/config/currencyFormatter";
import { getColorFromSpectrum, rgbColor2rgbString } from "@app/utils/utils";

export const MediaHeader = ({ media }) => {
  console.log("10: media >>>", media);

  return (
    <View style={styles.container}>
      <View style={styles.backdropContainer}>
        <Image
          style={styles.backdrop}
          source={{ uri: media.getBackdrop(IMAGES_SIZES.large) }}
        />
        <LinearGradient
          style={styles.backdropGradient}
          colors={backdropGradient}
        />
      </View>
      <View style={styles.dataContainer}>
        <View>
          <Paragraph variant="title">{media.name}</Paragraph>
          {media.tagline && (
            <Paragraph variant="caption">{media.tagline}</Paragraph>
          )}
          <View style={styles.middleContainer}>
            <View style={styles.posterContainer}>
              <Image
                source={{ uri: media.getPoster(IMAGES_SIZES.medium) }}
                style={styles.poster}
              />
            </View>
            <View style={styles.rightContainer}>
              <View style={styles.voteContainer}>
                <View
                  style={[
                    styles.vote,
                    { borderColor: getVoteColor(media.averageVote) },
                  ]}
                >
                  <Paragraph style={styles.voteText}>
                    {Math.round(media.averageVote * 10) / 10}
                  </Paragraph>
                </View>
              </View>
              <View style={styles.littleDataContainer}>
                <Paragraph style={styles.littleTitle}>Revenue:</Paragraph>
                <Paragraph style={styles.littleData}>
                  {currencyFormatter.format(media.revenue)}
                </Paragraph>
              </View>
              <View style={styles.littleDataContainer}>
                <Paragraph style={styles.littleTitle}>Status:</Paragraph>
                <Paragraph style={styles.littleData}>{media.status}</Paragraph>
              </View>
              <View style={styles.littleDataContainer}>
                <Paragraph style={styles.littleTitle}>Release date:</Paragraph>
                <Paragraph style={styles.littleData}>
                  {format(new Date(media.releaseDate), "do MMM yyyy")}
                </Paragraph>
              </View>
            </View>
          </View>
          <Paragraph>
            {formatDuration({
              hours: Math.floor(media.runtime / 60),
              minutes: media.runtime % 60,
            })}
          </Paragraph>
        </View>
      </View>
    </View>
  );
};

MediaHeader.propTypes = {
  media: PropTypes.object.isRequired,
};

const posterWidth = Dimensions.get("window").width / 3;
const posterHeight = posterWidth * POSTER_RATIO;
const voteSize = 40;
const backdropHeight = 200;
const dataOffset = 100;

const styles = StyleSheet.create({
  container: {
    borderColor: "blue",
    // borderWidth: 2,
    marginBottom: dataOffset,
  },
  backdropContainer: {
    height: backdropHeight,
    width: "100%",
    // borderColor: "green",
    borderColor: "rgb(255, 0, 0)",
    // borderWidth: 5,
    position: "absolute",
  },
  backdrop: {
    width: "100%",
    height: "100%",
    borderColor: "white",
    // borderWidth: 10,
  },
  backdropGradient: {
    height: "100%",
    width: "100%",
    position: "absolute",
  },
  dataContainer: {
    // borderWidth: 2,
    borderColor: "red",
    backgroundColor: "#0000",
    paddingLeft: 20,
    top: dataOffset,
  },
  middleContainer: {
    // borderWidth: 4,
    borderColor: "red",
    flexDirection: "row",
  },
  rightContainer: {
    marginLeft: 10,
    marginTop: 20,
    // borderWidth: 4,
    borderColor: "yellow",
  },
  posterContainer: {
    height: posterHeight,
    width: posterWidth,
    shadowColor: "#fff8",
    marginTop: 10,
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  poster: {
    height: "100%",
    width: "100%",
  },
  littleDataContainer: {
    marginTop: 10,
  },
  littleTitle: {
    // fontSize: 13,
  },
  littleData: {
    marginLeft: 5,
    marginTop: 1,
    color: "green",
  },
  voteContainer: {
    height: voteSize,
  },
  vote: {
    borderWidth: 4,
    width: voteSize,
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: voteSize / 2,
  },
  voteText: {
    fontWeight: "bold",
    textAlign: "center",
  },
});

const backdropGradient = [`${colors.background}77`, colors.background];

const getVoteColor = (vote) =>
  rgbColor2rgbString(
    getColorFromSpectrum(vote, VOTE_COLORS_VALUES, VOTE_COLORS)
  );

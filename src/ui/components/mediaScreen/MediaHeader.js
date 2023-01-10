import { View, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { IMAGES_SIZES, MEDIA_TYPES, POSTER_RATIO } from "@app/utils/constants";
import { Paragraph } from "../Paragraph";
import { format, formatDuration } from "date-fns";
import { currencyFormatter } from "@app/config/currencyFormatter";
import { getReadableListOfItems, getVoteColor } from "@app/utils/utils";

export const MediaHeader = ({ media }) => {
  return (
    <View style={styles.container}>
      <View>
        <Paragraph variant="title">{media.name}</Paragraph>
        {media.tagline && (
          <Paragraph variant="caption">{media.tagline}</Paragraph>
        )}
        <View style={styles.middleContainer}>
          <View>
            <View style={styles.posterContainer}>
              <Image
                source={{ uri: media.getPoster(IMAGES_SIZES.medium) }}
                style={styles.poster}
              />
            </View>
            {media.runtime && (
              <Paragraph>
                {formatDuration({
                  hours: Math.floor(media.runtime / 60),
                  minutes: media.runtime % 60,
                })}
              </Paragraph>
            )}
            {media.mediaType === MEDIA_TYPES.tv && (
              <>
                {media.inProduction ? (
                  <Paragraph>In production</Paragraph>
                ) : (
                  <Paragraph>Finished</Paragraph>
                )}
              </>
            )}
            {media.episodesNumber && (
              <Paragraph>Episodes: {media.episodesNumber}</Paragraph>
            )}
            {media.seasonsNumber && (
              <Paragraph>Seasons: {media.seasonsNumber}</Paragraph>
            )}
            {media.originalLanguage && (
              <Paragraph style={styles.littleTitle}>
                Language: {media.originalLanguage}
              </Paragraph>
            )}
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.topRightContainer}>
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
            </View>
            {media.revenue && (
              <View style={styles.littleDataContainer}>
                <Paragraph style={styles.littleTitle}>Revenue:</Paragraph>
                <Paragraph style={styles.littleData}>
                  {currencyFormatter.format(media.revenue)}
                </Paragraph>
              </View>
            )}
            <View style={styles.littleDataContainer}>
              <Paragraph style={styles.littleTitle}>Status:</Paragraph>
              <Paragraph style={styles.littleData}>{media.status}</Paragraph>
            </View>
            {media.releaseDate && (
              <View style={styles.littleDataContainer}>
                <Paragraph style={styles.littleTitle}>Release date:</Paragraph>
                <Paragraph style={styles.littleData}>
                  {format(new Date(media.releaseDate), "do MMM yyyy")}
                </Paragraph>
              </View>
            )}
            {media.createdBy && media.createdBy.length > 0 && (
              <View style={styles.littleDataContainer}>
                <Paragraph style={styles.littleTitle}>Created by:</Paragraph>
                <Paragraph style={styles.littleData}>
                  {getReadableListOfItems(media.createdBy, "name")}
                </Paragraph>
              </View>
            )}
            {media.firstAired && (
              <View style={styles.littleDataContainer}>
                <Paragraph style={styles.littleTitle}>First aired:</Paragraph>
                <Paragraph style={styles.littleData}>
                  {format(new Date(media.firstAired), "do MMM yyyy")}
                </Paragraph>
              </View>
            )}
            {media.lastAired && (
              <View style={styles.littleDataContainer}>
                <Paragraph style={styles.littleTitle}>Last aired:</Paragraph>
                <Paragraph style={styles.littleData}>
                  {format(new Date(media.lastAired), "do MMM yyyy")}
                </Paragraph>
              </View>
            )}
            {/* todo: create episode class */}
            {/* todo: create episode screen */}
            {media.nextEpisode && (
              <View style={styles.littleDataContainer}>
                <Paragraph style={styles.littleTitle}>Next episode:</Paragraph>
                <Paragraph style={styles.littleData}>
                  {format(new Date(media.nextEpisode.air_date), "do MMM yyyy")}
                </Paragraph>
              </View>
            )}
            {media.originCountry && (
              <View style={styles.littleDataContainer}>
                <Paragraph style={styles.littleTitle}>
                  Origin countries:
                </Paragraph>
                <Paragraph style={styles.littleData}>
                  {getReadableListOfItems(media.originCountry)}
                </Paragraph>
              </View>
            )}
          </View>
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

const styles = StyleSheet.create({
  container: {
    borderColor: "blue",
    // borderWidth: 2,
  },
  middleContainer: {
    // borderWidth: 1,
    borderColor: "red",
    flexDirection: "row",
    paddingTop: 10,
  },
  posterContainer: {
    height: posterHeight,
    width: posterWidth,
    shadowColor: "#fff8",
    marginBottom: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    // borderWidth: 2,
    // borderColor: "blue",
  },
  poster: {
    height: "100%",
    width: "100%",
  },
  rightContainer: {
    marginLeft: 10,
    // borderWidth: 1,
    borderColor: "red",
    flex: 1,
  },
  topRightContainer: {
    borderColor: "blue",
    // borderWidth: 1,
  },
  littleDataContainer: {
    marginTop: 10,
    // borderWidth: 1,
    borderColor: "green",
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

import { View, StyleSheet, Image, Dimensions } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { IMAGES_SIZES, MEDIA_TYPES, POSTER_RATIO } from "@app/utils/constants";
import { Paragraph } from "../commonComponents/Paragraph";
import { format, formatDuration } from "date-fns";
import { currencyFormatter } from "@app/config/currencyFormatter";
import { getReadableListOfItems } from "@app/utils/utils";
import { Score } from "../commonComponents/Score";

export const MediaHeader = ({ media }) => {
  return (
    <View style={styles.container}>
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
          <Paragraph>{media.status}</Paragraph>
          {media.runtime && (
            <Paragraph>
              {formatDuration({
                hours: Math.floor(media.runtime / 60),
                minutes: media.runtime % 60,
              })}
            </Paragraph>
          )}
          {media.mediaType === MEDIA_TYPES.tv && (
            <Paragraph>
              {media.inProduction ? "I" : "Not i"}n production
            </Paragraph>
          )}
          {media.episodesNumber && (
            <Paragraph>Episodes: {media.episodesNumber}</Paragraph>
          )}
          {media.seasonsNumber && (
            <Paragraph>Seasons: {media.seasonsNumber}</Paragraph>
          )}
          {media.originCountry && (
            <Paragraph style={styles.littleTitle}>
              Countries: {getReadableListOfItems(media.originCountry)}
            </Paragraph>
          )}
          {media.originalLanguage && (
            <Paragraph style={styles.littleTitle}>
              Language: {media.originalLanguage}
            </Paragraph>
          )}
        </View>
        <View style={styles.rightContainer}>
          <View style={styles.topRightContainer}>
            <Score score={media.averageVote} />
          </View>
          {media.revenue !== undefined && (
            <View style={styles.littleDataContainer}>
              <Paragraph style={styles.littleTitle}>Revenue:</Paragraph>
              <Paragraph style={styles.littleData}>
                {currencyFormatter.format(media.revenue)}
              </Paragraph>
            </View>
          )}
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
          {media.genres && media.genres.length > 0 && (
            <View style={styles.littleDataContainer}>
              <Paragraph style={styles.littleTitle}>Genre:</Paragraph>
              <Paragraph style={styles.littleData}>
                {getReadableListOfItems(media.genres, "name")}
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
          {media.nextEpisode && (
            <View style={styles.littleDataContainer}>
              <Paragraph style={styles.littleTitle}>Next episode:</Paragraph>
              <Paragraph style={styles.littleData}>
                {format(new Date(media.nextEpisode.air_date), "do MMM yyyy")}
              </Paragraph>
            </View>
          )}
          {media.productionCompanies &&
            media.productionCompanies.length > 0 && (
              <View style={styles.littleDataContainer}>
                <Paragraph style={styles.littleTitle}>
                  Production Companies
                </Paragraph>
                <Paragraph style={styles.littleData}>
                  {getReadableListOfItems(media.productionCompanies, "name")}
                </Paragraph>
              </View>
            )}
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
});

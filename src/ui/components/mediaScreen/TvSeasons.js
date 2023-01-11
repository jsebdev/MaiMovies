import { FlatList, StyleSheet, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { Paragraph } from "../Paragraph";
import { SeasonCard } from "./SeasonCard";
import { IMAGES_SIZES } from "@app/utils/constants";

export const TvSeasons = ({ media }) => {
  if (!media.seasons) return null;
  return (
    <>
      {media.seasons && media.seasons.length > 0 && (
        <View style={styles.container}>
          <Paragraph variant="title">Seasons</Paragraph>
          <FlatList
            data={media.seasons}
            horizontal={true}
            keyExtractor={(video) => video.id}
            renderItem={({ item }) => (
              <SeasonCard
                posterUrl={
                  item.poster_path &&
                  `${media.getPosterBaseUrl(IMAGES_SIZES.medium)}${
                    item.poster_path
                  }`
                }
                title={item.name}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
});

TvSeasons.propTypes = {
  media: PropTypes.object,
};

import { View, StyleSheet } from "react-native";
import React from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconEntypo from "react-native-vector-icons/Entypo";
import { ACCOUNT_NAVIGATION, colors, MEDIA_TYPES } from "@app/utils/constants";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "@app/store/store.hook";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";

export const MediaButtons = observer(({ mediaType, mediaId }) => {
  const navigation = useNavigation();
  const { userStore } = useStore();
  const favorites =
    mediaType === MEDIA_TYPES.movie
      ? userStore.favoritesMovies.list
      : userStore.favoritesTvShows.list;

  const isFavorite = () => {
    return favorites.has(mediaId);
  };

  const addToFavorites = () => {
    if (!userStore.sessionId) {
      navigation.navigate(ACCOUNT_NAVIGATION);
      return;
    }
    // todo: add to favorites
    console.log("adding to favorites");
  };
  const addToList = () => {
    if (!userStore.sessionId) {
      navigation.navigate(ACCOUNT_NAVIGATION);
      return;
    }
    // todo: add to list
    console.log("adding to list");
  };

  return (
    <View style={styles.container}>
      <IconEntypo name="add-to-list" style={styles.icon} onPress={addToList} />
      <IconAntDesign
        name={isFavorite() ? "heart" : "hearto"}
        style={styles.icon}
        onPress={addToFavorites}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
    paddingRight: 15,
  },
  icon: {
    fontSize: 30,
    color: colors.bright,
    marginLeft: 25,
  },
});

MediaButtons.propTypes = {
  mediaType: PropTypes.string.isRequired,
  mediaId: PropTypes.number.isRequired,
};

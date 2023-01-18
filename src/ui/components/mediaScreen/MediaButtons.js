import { View, StyleSheet } from "react-native";
import React from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconEntypo from "react-native-vector-icons/Entypo";
import {
  ACCOUNT_NAVIGATION,
  ADD_TO_LIST_SCREEN,
  colors,
  MEDIA_TYPES,
} from "@app/utils/constants";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "@app/store/store.hook";
import { observer } from "mobx-react-lite";
import PropTypes from "prop-types";
import { MyPressable } from "../commonComponents/MyPressable";

export const MediaButtons = observer(({ mediaType, mediaId }) => {
  const navigation = useNavigation();
  const { userStore } = useStore();
  const favorites =
    mediaType === MEDIA_TYPES.movie
      ? userStore.favoritesMovies.list
      : userStore.favoritesTvShows.list;
  const isFavorite = favorites.has(mediaId);

  const toggleFavorite = () => {
    if (!userStore.sessionId) {
      navigation.navigate(ACCOUNT_NAVIGATION);
      return;
    }
    userStore.markAsFavorite(mediaType, mediaId, !isFavorite);
  };
  const addToList = () => {
    if (!userStore.sessionId) {
      navigation.navigate(ACCOUNT_NAVIGATION);
      return;
    }
    navigation.push(ADD_TO_LIST_SCREEN, {
      mediaId,
      mediaType,
    });
  };

  return (
    <View style={styles.container}>
      <MyPressable>
        <IconEntypo
          name="add-to-list"
          style={styles.icon}
          onPress={addToList}
        />
      </MyPressable>
      <MyPressable>
        <IconAntDesign
          name={isFavorite ? "heart" : "hearto"}
          style={styles.icon}
          onPress={toggleFavorite}
        />
      </MyPressable>
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

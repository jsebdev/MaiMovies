import { View, StyleSheet } from "react-native";
import React from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconEntypo from "react-native-vector-icons/Entypo";
import { ACCOUNT_NAVIGATION, colors } from "@app/utils/constants";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "@app/store/store.hook";
import { observer } from "mobx-react-lite";

export const MediaButtons = observer(() => {
  const navigation = useNavigation();
  const { userStore } = useStore();

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
        name="hearto"
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

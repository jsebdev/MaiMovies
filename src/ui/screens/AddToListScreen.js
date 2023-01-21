import React, { useEffect } from "react";
import { BackgroundView } from "../components/commonComponents/BackgroundView";
import { Paragraph } from "../components/commonComponents/Paragraph";
import { useStore } from "@app/store/store.hook";
import PropTypes from "prop-types";
import { Alert, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MyPressable } from "../components/commonComponents/MyPressable";

export const AddToListScreen = ({ route, navigation }) => {
  const { mediaStore, userStore } = useStore();
  const { mediaType, mediaId } = route.params;
  const media = mediaStore.getMedia(mediaType, mediaId);
  useEffect(() => {
    navigation.setOptions({ title: `Add to list: ${media.name}` });
  }, []);
  const lists = Array.from(userStore.lists.values());
  const addToList = async (listId) => {
    const result = await userStore.addItemToList(listId, mediaType, mediaId);
    if (result.success === false) {
      Alert.alert(
        "Could not add item to list. Probably because the item is already in the list."
      );
      return;
    }
    Alert.alert(`${media.name} added to list successfully`);
    navigation.goBack();
  };
  return (
    <BackgroundView style={styles.mainContainer}>
      <ScrollView style={styles.listsContainer}>
        {lists.map((list) => (
          <MyPressable
            key={list.id}
            style={styles.list}
            onPress={() => addToList(list.id)}
          >
            <Paragraph style={styles.listName}>{list.name}</Paragraph>
          </MyPressable>
        ))}
      </ScrollView>
    </BackgroundView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {},
  title: {
    textAlign: "center",
    fontSize: 18,
  },
  mediaName: {
    fontWeight: "bold",
  },
  listsContainer: {
    // marginTop: 20,
  },
  list: {
    padding: 30,
    alignItems: "flex-start",
  },
  listName: {
    fontSize: 18,
  },
});

AddToListScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

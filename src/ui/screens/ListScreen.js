import React, { useState } from "react";
import { BackgroundView } from "../components/commonComponents/BackgroundView";
import { Paragraph } from "../components/commonComponents/Paragraph";
import PropTypes from "prop-types";
import { useStore } from "@app/store/store.hook";
import { observer } from "mobx-react-lite";
import { MediaList } from "../components/commonComponents/MediaList";
import { MyButton } from "../components/commonComponents/MyButton";
import { Alert, StyleSheet, View } from "react-native";
import { colors, TRENDING_NAVIGATION } from "@app/utils/constants";

export const ListScreen = observer(({ route, navigation }) => {
  const listId = route?.params?.listId;
  const { userStore } = useStore();
  const list = userStore.lists.get(listId);
  const [selectedMedia, setSelectedMedia] = useState([]);
  const deleteMediaPrompt = () => {
    const selectedNumber = selectedMedia.length;
    Alert.alert(
      `Are you sure you want to delete ${selectedNumber} item${
        selectedNumber > 1 ? "s" : ""
      } from this list`,
      "",
      [
        {
          text: "Yes",
          onPress: async () => {
            const result = await userStore.deleteMediasFromList(
              listId,
              selectedMedia.map(({ id, mediaType }) => ({
                mediaId: id,
                mediaType,
              }))
            );
            if (!result.success) Alert.alert("Something went wrong");
          },
        },
        {
          text: "No",
        },
      ]
    );
  };
  return (
    <BackgroundView>
      {selectedMedia.length > 0 && (
        <MyButton
          onPress={deleteMediaPrompt}
          textStyle={styles.deleteButtonText}
          rootStyle={styles.deleteButton}
        >
          Delete items
        </MyButton>
      )}
      {list !== undefined && list.items && list.items.length > 0 ? (
        <MediaList
          mediaList={list.items}
          selectedMedia={selectedMedia}
          setSelectedMedia={setSelectedMedia}
        />
      ) : (
        <View style={styles.messageContainer}>
          <Paragraph style={styles.message}>This list is empty</Paragraph>
          <MyButton onPress={() => navigation.navigate(TRENDING_NAVIGATION)}>
            Browse media
          </MyButton>
        </View>
      )}
    </BackgroundView>
  );
});

const styles = StyleSheet.create({
  messageContainer: {
    alignItems: "center",
    paddingTop: 50,
  },
  message: {
    fontSize: 18,
    marginBottom: 30,
  },
  deleteButtonText: {
    color: colors.danger,
  },
  deleteButton: {
    marginVertical: 20,
  },
});

ListScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

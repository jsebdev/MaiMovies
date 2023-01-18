import React from "react";
import { BackgroundView } from "../components/commonComponents/BackgroundView";
import { Paragraph } from "../components/commonComponents/Paragraph";
import PropTypes from "prop-types";
import { useStore } from "@app/store/store.hook";
import { observer } from "mobx-react-lite";
import { MediaList } from "../components/commonComponents/MediaList";
import { MyButton } from "../components/commonComponents/MyButton";
import { StyleSheet, View } from "react-native";
import { TRENDING_NAVIGATION } from "@app/utils/constants";

export const ListScreen = observer(({ route, navigation }) => {
  const listId = route?.params?.listId;
  const { userStore } = useStore();
  const list = userStore.lists.get(listId);
  return (
    <BackgroundView>
      {list !== undefined && list.items && list.items.length > 0 ? (
        <MediaList mediaList={list.items} />
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
});

ListScreen.propTypes = {
  route: PropTypes.object,
  navigation: PropTypes.object,
};

import React, { useEffect } from "react";
import { useStore } from "@app/store/store.hook";
import { FlatList, StyleSheet, View } from "react-native";
import { observer } from "mobx-react-lite";
import { AccountHeader } from "./AccountHeader";
import { ListItem } from "./ListItem";
import { ListSection } from "./ListSection";
import { MEDIA_TYPES } from "@app/utils/constants";

export const AccountDetails = observer(() => {
  const { userStore } = useStore();
  const lists = Array.from(userStore.lists.values()).reverse();
  useEffect(() => {
    (async () => {
      await userStore.fetchAccountDetails();
      userStore.fetchListsNextPage();
      userStore.fetchAllFavorites(MEDIA_TYPES.movie);
      userStore.fetchAllFavorites(MEDIA_TYPES.tv);
    })();
  }, []);
  return (
    <View style={styles.mainContainer}>
      <FlatList
        ListHeaderComponent={
          <>
            <AccountHeader />
            <ListSection listLength={lists.length} />
          </>
        }
        data={lists}
        keyExtractor={(list) => list.id}
        renderItem={({ item }) => <ListItem list={item} />}
        numColumns={2}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});

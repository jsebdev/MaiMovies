import React, { useEffect } from "react";
import { useStore } from "@app/store/store.hook";
import { FlatList, StyleSheet, View } from "react-native";
import { observer } from "mobx-react-lite";
import { AccountHeader } from "./AccountHeader";
import { ListItem } from "./ListItem";
import { ListSection } from "./ListSection";

export const AccountDetails = observer(() => {
  const { userStore } = useStore();
  const lists = Array.from(userStore.lists.values()).reverse();
  useEffect(() => {
    (async () => {
      await userStore.fetchAccountDetails();
      await userStore.fetchListsNextPage();
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
        //todo: make logic to fetch next page of lists
        // onEndReached={loadMoreData}
        // ListFooterComponent={<FlatListLoader showSpinner={showSpinner} />}
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

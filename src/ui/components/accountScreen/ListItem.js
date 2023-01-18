import { View, StyleSheet, ImageBackground, Pressable } from "react-native";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Paragraph } from "../commonComponents/Paragraph";
import { observer } from "mobx-react-lite";
import { useStore } from "@app/store/store.hook";
import { LinearGradientCard } from "../commonComponents/LinearGradientCard";
import { useNavigation } from "@react-navigation/native";
import { LIST_SCREEN } from "@app/utils/constants";

export const ListItem = observer(({ list }) => {
  const { userStore } = useStore();
  const navigation = useNavigation();
  const Background = list.background
    ? BackgroundList(list.background)
    : LinearGradientCard;
  useEffect(() => {
    (async () => {
      if (list.itemCount === 0) return;
      await userStore.fetchListItems(list.id);
    })();
  }, []);
  return (
    <Pressable
      onPress={() =>
        navigation.push(LIST_SCREEN, { name: list.name, listId: list.id })
      }
      style={styles.container}
    >
      <Background style={styles.background}>
        <Paragraph style={styles.listName}>{list.name}</Paragraph>
        <Paragraph style={styles.itemCount}>
          {list.itemCount} item{list.itemCount !== 1 && "s"}
        </Paragraph>
      </Background>
    </Pressable>
  );
});

const BackgroundList = (backgroundUrl) => {
  const InternalBackground = ({ children, style }) => {
    return (
      <ImageBackground source={{ uri: backgroundUrl }} style={style}>
        <View
          style={{
            backgroundColor: "#0008",
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        />
        {children}
      </ImageBackground>
    );
  };
  InternalBackground.propTypes = {
    children: PropTypes.node,
    style: PropTypes.object,
  };
  return InternalBackground;
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    aspectRatio: 5 / 3,
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
  },
  background: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  listName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  itemCount: {
    fontSize: 18,
  },
});

ListItem.propTypes = {
  list: PropTypes.object,
};

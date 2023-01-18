import React from "react";
import { tabBarScreenOptions } from "@app/ui/globalStyles";
import {
  MEDIA_LIST_TYPES,
  MEDIA_TYPES,
  MOVIES_FAVORITES_NAVIGATION,
  TV_FAVORITES_NAVIGATION,
} from "@app/utils/constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import { MyTabBar } from "./MyTabBar";
import { MediaListNavigation } from "./MediaListNavigation";

const Tabs = createMaterialTopTabNavigator();

export const FavoritesNavigation = () => {
  return (
    <Tabs.Navigator
      tabBarPosition="top"
      initialLayout={{
        width: Dimensions.get("window").width,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={tabBarScreenOptions}
    >
      <Tabs.Screen
        name={MOVIES_FAVORITES_NAVIGATION}
        options={{ title: "Movies" }}
        component={MediaListNavigation}
        initialParams={{
          mediaType: MEDIA_TYPES.movie,
          listType: MEDIA_LIST_TYPES.favorites,
        }}
      />
      <Tabs.Screen
        name={TV_FAVORITES_NAVIGATION}
        options={{ title: "Tv" }}
        component={MediaListNavigation}
        initialParams={{
          mediaType: MEDIA_TYPES.tv,
          listType: MEDIA_LIST_TYPES.favorites,
        }}
      />
    </Tabs.Navigator>
  );
};

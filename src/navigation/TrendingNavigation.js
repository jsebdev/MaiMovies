import React from "react";
import { generalScreenOptions } from "@app/ui/globalStyles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import { MyTabBar } from "./MyTabBar";
import {
  MEDIA_LIST_TYPES,
  MEDIA_TYPES,
  MOVIES_TRENDING_NAVIGATION,
  TV_TRENDING_NAVIGATION,
} from "@app/utils/constants";
import { MediaListNavigation } from "./MediaListNavigation";

const Tabs = createMaterialTopTabNavigator();

export const TrendingNavigation = () => {
  return (
    <Tabs.Navigator
      tabBarPosition="top"
      initialLayout={{
        width: Dimensions.get("window").width,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={({ route, navigation }) => {
        const navigator = navigation
          .getState()
          .routes.find(({ name }) => name === route.name);
        const routes = navigator.state?.routes;
        if (!routes) return generalScreenOptions;
        //todo:Fix now swiping when navigation is deeper than just the media screen
        if (routes.length >= 3) {
          return { ...generalScreenOptions, swipeEnabled: false };
        }
        return generalScreenOptions;
      }}
    >
      <Tabs.Screen
        name={MOVIES_TRENDING_NAVIGATION}
        options={{ title: "Movies" }}
        component={MediaListNavigation}
        initialParams={{
          mediaType: MEDIA_TYPES.movie,
          listType: MEDIA_LIST_TYPES.trending,
        }}
      />
      <Tabs.Screen
        name={TV_TRENDING_NAVIGATION}
        options={{ title: "Tv" }}
        component={MediaListNavigation}
        initialParams={{
          mediaType: MEDIA_TYPES.tv,
          listType: MEDIA_LIST_TYPES.trending,
        }}
      />
    </Tabs.Navigator>
  );
};

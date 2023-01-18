import React from "react";
import { tabBarScreenOptions } from "@app/ui/globalStyles";
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
      screenOptions={tabBarScreenOptions}
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

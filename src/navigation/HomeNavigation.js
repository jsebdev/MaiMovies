import React from "react";
import { generalScreenOptions } from "@app/ui/globalStyles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import { MyTabBar } from "./MyTabBar";
import { TrendingMoviesNavigation } from "./TrendingMoviesNavigation";
import { TrendingTvNavigation } from "./TrendingTvNavigation";

const Tabs = createMaterialTopTabNavigator();

export const HomeNavigation = () => {
  return (
    <Tabs.Navigator
      screenOptions={generalScreenOptions}
      tabBarPosition="top"
      initialLayout={{
        width: Dimensions.get("window").width,
      }}
      tabBar={(props) => <MyTabBar {...props} />}
    >
      <Tabs.Screen name="Movies" component={TrendingMoviesNavigation} />
      <Tabs.Screen name="TV" component={TrendingTvNavigation} />
    </Tabs.Navigator>
  );
};

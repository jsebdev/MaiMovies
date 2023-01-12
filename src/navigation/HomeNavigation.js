import React from "react";
import { generalScreenOptions } from "@app/ui/globalStyles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import { MyTabBar } from "./MyTabBar";
import { TrendingMoviesNavigation } from "./TrendingMoviesNavigation";
import { TrendingTvNavigation } from "./TrendingTvNavigation";
import { IMAGE_LIST_SCREEN } from "@app/utils/constants";

const Tabs = createMaterialTopTabNavigator();

export const HomeNavigation = () => {
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
        if (routes.length >= 3) {
          return { ...generalScreenOptions, swipeEnabled: false };
        }
        return generalScreenOptions;
      }}
    >
      <Tabs.Screen
        name="TrendingMoviesNavigation"
        options={{ title: "Movies" }}
        component={TrendingMoviesNavigation}
      />
      <Tabs.Screen
        name="TrendingTvNavigation"
        options={{ title: "Tv" }}
        component={TrendingTvNavigation}
      />
    </Tabs.Navigator>
  );
};

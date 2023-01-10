import React from "react";
import { HomeScreen } from "@app/ui/screens/HomeScreen";
import { MediaScreen } from "@app/ui/screens/MediaScreen";
import { MOVIE_SCREEN } from "@app/utils/constants";
import { generalScreenOptions } from "@app/ui/globalStyles";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import { MyTabBar } from "./MyTabBar";

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
      <Tabs.Screen name="Movies" component={HomeScreen} />
      <Tabs.Screen name="TV" component={HomeScreen} />
      {/* <Stack.Screen name={MOVIE_SCREEN} component={MediaScreen} /> */}
    </Tabs.Navigator>
  );
};

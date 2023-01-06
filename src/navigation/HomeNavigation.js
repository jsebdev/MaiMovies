import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "@app/ui/screens/HomeScreen";
import { MediaScreen } from "@app/ui/screens/MediaScreen";
import { MOVIE_SCREEN } from "@app/utils/constants";

const Stack = createStackNavigator();

export const HomeNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Trends" component={HomeScreen} />
      <Stack.Screen name={MOVIE_SCREEN} component={MediaScreen} />
    </Stack.Navigator>
  );
};

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MoviesScreen } from "@app/ui/screens/MoviesScreen";
import { MEDIA_NAVIGATION, MOVIES_TRENDING_SCREEN } from "@app/utils/constants";
import { generalScreenOptions } from "@app/ui/globalStyles";
import { MediaNavigation } from "./MediaNavigation";

const Stack = createStackNavigator();

export const TrendingMoviesNavigation = () => {
  return (
    <Stack.Navigator screenOptions={generalScreenOptions}>
      <Stack.Screen name={MOVIES_TRENDING_SCREEN} component={MoviesScreen} />
      <Stack.Screen name={MEDIA_NAVIGATION} component={MediaNavigation} />
    </Stack.Navigator>
  );
};

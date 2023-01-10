import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MoviesScreen } from "@app/ui/screens/MoviesScreen";
import { MediaScreen } from "@app/ui/screens/MediaScreen";
import { MOVIE_SCREEN } from "@app/utils/constants";
import { generalScreenOptions } from "@app/ui/globalStyles";

const Stack = createStackNavigator();

export const TrendingMoviesNavigation = () => {
  return (
    <Stack.Navigator screenOptions={generalScreenOptions}>
      <Stack.Screen name="TrendingMovies" component={MoviesScreen} />
      <Stack.Screen name={MOVIE_SCREEN} component={MediaScreen} />
    </Stack.Navigator>
  );
};

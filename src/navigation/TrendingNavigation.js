import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TrendingScreen } from "@app/ui/screens/TrendingScreen";
import { MovieScreen } from "@app/ui/screens/MovieScreen";

const Stack = createStackNavigator();

export const TrendingNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Trends" component={TrendingScreen} />
      <Stack.Screen name="Movie" component={MovieScreen} />
    </Stack.Navigator>
  );
};

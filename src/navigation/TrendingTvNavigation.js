import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MEDIA_NAVIGATION, TV_TRENDING_SCREEN } from "@app/utils/constants";
import { generalScreenOptions } from "@app/ui/globalStyles";
import { TrendingTvScreen } from "@app/ui/screens/TrendingTvScreen";
import { MediaNavigation } from "./MediaNavigation";

const Stack = createStackNavigator();

export const TrendingTvNavigation = () => {
  return (
    <Stack.Navigator screenOptions={generalScreenOptions}>
      <Stack.Screen name={TV_TRENDING_SCREEN} component={TrendingTvScreen} />
      <Stack.Screen name={MEDIA_NAVIGATION} component={MediaNavigation} />
    </Stack.Navigator>
  );
};

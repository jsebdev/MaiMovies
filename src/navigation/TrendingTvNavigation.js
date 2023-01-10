import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MediaScreen } from "@app/ui/screens/MediaScreen";
import { TV_SHOW_SCREEN } from "@app/utils/constants";
import { generalScreenOptions } from "@app/ui/globalStyles";
import { TvScreen } from "@app/ui/screens/TvScreen";

const Stack = createStackNavigator();

export const TrendingTvNavigation = () => {
  return (
    <Stack.Navigator screenOptions={generalScreenOptions}>
      <Stack.Screen name="TrendingTv" component={TvScreen} />
      <Stack.Screen name={TV_SHOW_SCREEN} component={MediaScreen} />
    </Stack.Navigator>
  );
};

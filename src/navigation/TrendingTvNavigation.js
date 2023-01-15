import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MediaScreen } from "@app/ui/screens/MediaScreen";
import {
  IMAGE_LIST_SCREEN,
  TV_SHOW_SCREEN,
  TV_TRENDING_SCREEN,
} from "@app/utils/constants";
import { generalScreenOptions } from "@app/ui/globalStyles";
import { TrendingTvScreen } from "@app/ui/screens/TrendingTvScreen";
import { ImagesListScreen } from "@app/ui/screens/ImagesListScreen";

const Stack = createStackNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const TrendingTvNavigation = () => {
  return (
    <Stack.Navigator screenOptions={generalScreenOptions}>
      <Stack.Screen name={TV_TRENDING_SCREEN} component={TrendingTvScreen} />
      <Stack.Screen name={TV_SHOW_SCREEN} component={MediaScreen} />
      <Stack.Screen
        name={IMAGE_LIST_SCREEN}
        component={ImagesListScreen}
        options={{
          cardStyleInterpolator: forFade,
        }}
      />
    </Stack.Navigator>
  );
};

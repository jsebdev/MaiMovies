import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MediaScreen } from "@app/ui/screens/MediaScreen";
import { IMAGE_LIST_SCREEN, MEDIA_SCREEN } from "@app/utils/constants";
import { generalScreenOptions } from "@app/ui/globalStyles";
import { ImagesListScreen } from "@app/ui/screens/ImagesListScreen";

const Stack = createStackNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const MediaNavigation = () => {
  return (
    <Stack.Navigator screenOptions={generalScreenOptions}>
      <Stack.Screen
        name={MEDIA_SCREEN}
        component={MediaScreen}
        options={({ route }) => ({
          title: route?.params?.name,
          headerShown: true,
        })}
      />
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

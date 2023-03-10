import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MediaScreen } from "@app/ui/screens/MediaScreen";
import {
  ACCOUNT_SCREEN,
  IMAGE_LIST_SCREEN,
  MEDIA_SCREEN,
} from "@app/utils/constants";
import { generalScreenOptions } from "@app/ui/globalStyles";
import { ImagesListScreen } from "@app/ui/screens/ImagesListScreen";
import PropTypes from "prop-types";

const Stack = createStackNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

export const MediaNavigation = ({ navigation }) => {
  const parentScreen = navigation.getState().routes[0].name;
  return (
    <Stack.Navigator screenOptions={generalScreenOptions}>
      <Stack.Screen
        name={MEDIA_SCREEN}
        component={MediaScreen}
        options={({ route }) => {
          return {
            title: route?.params?.name,
            headerShown: parentScreen === ACCOUNT_SCREEN ? true : false,
          };
        }}
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

MediaNavigation.propTypes = {
  navigation: PropTypes.object,
};

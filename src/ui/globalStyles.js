import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { colors } from "@app/utils/constants";

export const generalScreenOptions = ({ navigation }) => ({
  // headerTransparent: true,
  headerShown: false,
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: colors.background,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerLeft: () => (
    <Ionicons
      name="chevron-back-outline"
      color={colors.dimmed}
      size={30}
      style={{ marginLeft: 10 }}
      onPress={() => {
        navigation.goBack();
      }}
    />
  ),
});

export const tabBarScreenOptions = ({ route, navigation }) => {
  const navigator = navigation
    .getState()
    .routes.find(({ name }) => name === route.name);
  const routes = navigator.state?.routes;
  if (!routes) return generalScreenOptions;
  // if the second route contains routes as well, that means that there is that the current
  // screen is no longer the media screen alone, a new screen was pushed
  if (routes.length > 1 && routes[1].state?.routes) {
    return {
      ...generalScreenOptions,
      swipeEnabled: false,
    };
  }
  return generalScreenOptions;
};

export const pressableStyle = (pressed) => ({
  backgroundColor: pressed ? "#6c5cfa55" : "transparent",
  // backgroundColor: pressed ? "#f00" : "transparent",
});

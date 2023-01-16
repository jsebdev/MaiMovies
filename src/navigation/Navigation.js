import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Image } from "react-native";
import { FavoritesNavigation } from "./FavoritesNavigation";
// import { HomeNavigation } from "./HomeNavigation_copy";
import { TrendingNavigation } from "./TrendingNavigation";
import { AccountNavigation } from "./AccountNavigation";
import {
  ACCOUNT_NAVIGATION,
  colors,
  TRENDING_NAVIGATION,
} from "@app/utils/constants";
import { generalScreenOptions } from "@app/ui/globalStyles";

const Tab = createBottomTabNavigator();

export const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={ACCOUNT_NAVIGATION}
      screenOptions={(props) => ({
        ...generalScreenOptions(props),
        tabBarStyle: {
          backgroundColor: colors.tabs,
          borderTopWidth: 0,
          borderTopColor: "red",
        },
      })}
    >
      <Tab.Screen
        name={ACCOUNT_NAVIGATION}
        component={AccountNavigation}
        options={{
          tabBarLabel: "My Account",
          title: "My Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={TRENDING_NAVIGATION}
        component={TrendingNavigation}
        options={{
          tabBarLabel: "",
          //todo: change this image to a better one
          tabBarIcon: () =>
            renderImageIcon(require("@assets/images/moviesIcon.png")),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const renderImageIcon = (src) => {
  const iconSize = 60;
  return (
    <Image
      source={src}
      style={{
        width: iconSize,
        height: iconSize,
        top: -5,
      }}
    />
  );
};

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Image } from "react-native";
import { FavoritesNavigation } from "./FavoritesNavigation";
import { HomeNavigation } from "./HomeNavigation";
import { AccountNavigation } from "./AccountNavigation";
import { colors, HOME_SCREEN } from "@app/utils/constants";

const Tab = createBottomTabNavigator();

export const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={HOME_SCREEN}
      screenOptions={{
        headerShown: false,
        headerTintColor: "#0f0",
        headerStyle: {
          backgroundColor: "red",
        },
        tabBarStyle: {
          backgroundColor: colors.tabs,
          borderTopWidth: 0,
          borderTopColor: "red",
        },
      }}
    >
      <Tab.Screen
        name="Account"
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
        name={HOME_SCREEN}
        component={HomeNavigation}
        options={{
          tabBarLabel: "",
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

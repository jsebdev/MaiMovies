import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Image } from "react-native";
import { FavoritesNavigation } from "./FavoritesNavigation";
import { TrendingNavigation } from "./TrendingNavigation";
import { AccountNavigation } from "./AccountNavigation";

const Tab = createBottomTabNavigator();

export const Navigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Account"
        component={AccountNavigation}
        options={{
          tabBarLabel: "My Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Trending"
        component={TrendingNavigation}
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

const renderImageIcon = (src) => (
  <Image
    source={src}
    style={{
      width: 75,
      height: 75,
      top: -15,
    }}
  />
);

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import IconMaterialComunity from "react-native-vector-icons/MaterialCommunityIcons";
import { StyleSheet } from "react-native";
import { FavoritesNavigation } from "./FavoritesNavigation";
// import { HomeNavigation } from "./HomeNavigation_copy";
import { TrendingNavigation } from "./TrendingNavigation";
import { AccountNavigation } from "./AccountNavigation";
import {
  ACCOUNT_NAVIGATION,
  colors,
  FAVORITES_NAVIGATION,
  TRENDING_NAVIGATION,
} from "@app/utils/constants";
import { generalScreenOptions } from "@app/ui/globalStyles";

const Tab = createBottomTabNavigator();

export const HomeNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={TRENDING_NAVIGATION}
      screenOptions={(props) => ({
        ...generalScreenOptions(props),
        tabBarStyle: {
          backgroundColor: colors.tabs,
        },
      })}
    >
      <Tab.Screen
        name={ACCOUNT_NAVIGATION}
        component={AccountNavigation}
        options={{
          tabBarLabel: "My Account",
          tabBarLabelStyle: styles.tabBarLabel,
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
          tabBarLabel: "Home",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ color, size }) => (
            <IconMaterialComunity
              name="movie-filter"
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name={FAVORITES_NAVIGATION}
        component={FavoritesNavigation}
        options={{
          tabBarLabel: "Favorites",
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="heart" color={color} size={size} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

// const renderImageIcon = (src) => {
//   const iconSize = 60;
//   return (
//     <Image
//       source={src}
//       style={{
//         width: iconSize,
//         height: iconSize,
//         top: -5,
//       }}
//     />
//   );
// };

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 18,
  },
});

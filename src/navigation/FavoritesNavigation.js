import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FavoritesScreen } from "@app/screens/FavoritesScreen";

const Stack = createStackNavigator();

export const FavoritesNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favs"
        component={FavoritesScreen}
        options={{
          title: "Favs",
        }}
      />
    </Stack.Navigator>
  );
};

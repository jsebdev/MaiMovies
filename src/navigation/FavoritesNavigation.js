import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { FavoritesScreen } from "@app/ui/screens/FavoritesScreen";
import { generalScreenOptions } from "@app/ui/globalStyles";

const Stack = createStackNavigator();

export const FavoritesNavigation = () => {
  return (
    <Stack.Navigator screenOptions={generalScreenOptions}>
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

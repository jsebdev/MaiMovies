import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "@app/ui/screens/AccountScreen";
import { TestScreen } from "@app/ui/screens/TestScreen";
import { StyleSheet } from "react-native";
import { generalScreenOptions } from "@app/ui/globalStyles";

const Stack = createStackNavigator();

export const AccountNavigation = () => {
  return (
    <Stack.Navigator screenOptions={generalScreenOptions}>
      <Stack.Screen
        name="Accnt"
        component={AccountScreen}
        options={({ route }) => ({
          title: route.params?.title,
        })}
        initialParams={{ title: "account title initial" }}
      />
      <Stack.Screen
        name="test"
        component={TestScreen}
        options={({ route }) => ({
          title: route.params?.title,
        })}
        initialParams={{ title: "test title initial" }}
      />
    </Stack.Navigator>
  );
};

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "@app/screens/AccountScreen";

const Stack = createStackNavigator();

export const AccountNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Accnt" component={AccountScreen} />
    </Stack.Navigator>
  );
};

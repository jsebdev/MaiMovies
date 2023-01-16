import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "@app/ui/screens/AccountScreen";
import TestScreen from "@app/ui/screens/TestScreen";
import { generalScreenOptions } from "@app/ui/globalStyles";
import { ACCOUNT_SCREEN, NEW_LIST_SCREEN } from "@app/utils/constants";
import { NewListScreen } from "@app/ui/screens/NewListScreen";

const Stack = createStackNavigator();

export const AccountNavigation = () => {
  return (
    <Stack.Navigator screenOptions={generalScreenOptions}>
      <Stack.Screen name={ACCOUNT_SCREEN} component={AccountScreen} />
      <Stack.Screen name={NEW_LIST_SCREEN} component={NewListScreen} />
      {/* <Stack.Screen
        name="test"
        component={TestScreen}
        options={({ route }) => ({
          title: route.params?.title,
        })}
        initialParams={{ title: "test title initial" }}
      /> */}
    </Stack.Navigator>
  );
};

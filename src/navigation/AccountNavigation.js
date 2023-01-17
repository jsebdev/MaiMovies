import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "@app/ui/screens/AccountScreen";
import { generalScreenOptions } from "@app/ui/globalStyles";
import {
  ACCOUNT_SCREEN,
  LIST_SCREEN,
  MEDIA_NAVIGATION,
  NEW_LIST_SCREEN,
} from "@app/utils/constants";
import { NewListScreen } from "@app/ui/screens/NewListScreen";
import { ListScreen } from "@app/ui/screens/ListScreen";
import { MediaNavigation } from "./MediaNavigation";

const Stack = createStackNavigator();

export const AccountNavigation = () => {
  return (
    <Stack.Navigator screenOptions={generalScreenOptions}>
      <Stack.Screen name={ACCOUNT_SCREEN} component={AccountScreen} />
      <Stack.Screen
        name={NEW_LIST_SCREEN}
        options={{ headerShown: true, title: "Create new List" }}
        component={NewListScreen}
      />
      <Stack.Screen
        name={LIST_SCREEN}
        component={ListScreen}
        options={({ route }) => ({
          title: route?.params?.name,
          headerShown: true,
        })}
      />
      <Stack.Screen name={MEDIA_NAVIGATION} component={MediaNavigation} />
    </Stack.Navigator>
  );
};

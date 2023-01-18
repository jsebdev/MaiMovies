import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeNavigation } from "./HomeNavigation";
import { generalScreenOptions } from "@app/ui/globalStyles";
import { SearchNavigation } from "./SearchNavigation";
import {
  ADD_TO_LIST_SCREEN,
  HOME_NAVIGATION,
  SEARCH_NAVIGATION,
} from "@app/utils/constants";
import { AddToListScreen } from "@app/ui/screens/AddToListScreen";

const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={generalScreenOptions}>
      <Stack.Screen name={HOME_NAVIGATION} component={HomeNavigation} />
      <Stack.Screen name={SEARCH_NAVIGATION} component={SearchNavigation} />
      <Stack.Screen
        name={ADD_TO_LIST_SCREEN}
        component={AddToListScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

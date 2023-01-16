import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Navigation } from "./Navigation";
import { generalScreenOptions } from "@app/ui/globalStyles";
import { SearchNavigation } from "./SearchNavigation";
import { HOME_NAVIGATION, SEARCH_NAVIGATION } from "@app/utils/constants";

const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={generalScreenOptions}>
      <Stack.Screen name={HOME_NAVIGATION} component={Navigation} />
      <Stack.Screen name={SEARCH_NAVIGATION} component={SearchNavigation} />
    </Stack.Navigator>
  );
};

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { generalScreenOptions } from "@app/ui/globalStyles";
import { SearchScreen } from "@app/ui/screens/SearchScreen";
import { MEDIA_SEARCH_SCREEN, SEARCH_SCREEN } from "@app/utils/constants";
import { MediaScreen } from "@app/ui/screens/MediaScreen";

const Stack = createStackNavigator();

export const SearchNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={(props) => ({
        ...generalScreenOptions(props),
        headerShown: true,
        title: "Search Movies and Shows",
      })}
    >
      <Stack.Screen name={SEARCH_SCREEN} component={SearchScreen} />
      <Stack.Screen name={MEDIA_SEARCH_SCREEN} component={MediaScreen} />
    </Stack.Navigator>
  );
};

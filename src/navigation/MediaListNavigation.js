import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { MEDIA_LIST_SCREEN, MEDIA_NAVIGATION } from "@app/utils/constants";
import { generalScreenOptions } from "@app/ui/globalStyles";
import { MediaNavigation } from "./MediaNavigation";
import PropTypes from "prop-types";
import { MediaListScreen } from "@app/ui/screens/MediaListScreen";

const Stack = createStackNavigator();

export const MediaListNavigation = ({ route }) => {
  const mediaType = route.params.mediaType;
  const listType = route.params.listType;
  return (
    <Stack.Navigator screenOptions={generalScreenOptions}>
      <Stack.Screen
        name={MEDIA_LIST_SCREEN}
        component={MediaListScreen}
        initialParams={{ mediaType, listType }}
      />
      <Stack.Screen name={MEDIA_NAVIGATION} component={MediaNavigation} />
    </Stack.Navigator>
  );
};

MediaListNavigation.propTypes = {
  route: PropTypes.object,
};

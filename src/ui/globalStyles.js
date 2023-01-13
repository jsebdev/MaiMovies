import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

import { colors } from "@app/utils/constants";

export const generalScreenOptions = ({ navigation }) => ({
  // headerTransparent: true,
  headerShown: false,
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: colors.background,
    elevation: 0,
    shadowOpacity: 0,
  },
  headerLeft: () => (
    <Ionicons
      name="chevron-back-outline"
      color={colors.dimmed}
      size={30}
      style={{ marginLeft: 10 }}
      onPress={() => {
        console.log("22: navigation >>>", navigation);
        navigation.goBack();
      }}
    />
  ),
});

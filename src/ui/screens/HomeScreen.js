import { View, Text } from "react-native";
import React from "react";
import { TrendingList } from "../components/TrendingList";

export const HomeScreen = () => {
  return (
    <View>
      <Text>Home</Text>
      <TrendingList />
    </View>
  );
};

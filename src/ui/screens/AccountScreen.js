import { View, Button } from "react-native";
import React from "react";
import { Test } from "../components/TestComponent";

export const AccountScreen = ({ navigation }) => {
  return (
    <View>
      <Button
        title="Go to test"
        onPress={() => {
          navigation.push("test", {
            title: "new test title",
          });
        }}
      />
      {/* <Test /> */}
    </View>
  );
};

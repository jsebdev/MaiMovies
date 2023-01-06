import { View, Text, Button } from "react-native";
import React from "react";

export const AccountScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Account</Text>
      <Button
        title="Go to test"
        onPress={() => {
          navigation.push("test", {
            title: "new test title",
          });
        }}
      />
    </View>
  );
};

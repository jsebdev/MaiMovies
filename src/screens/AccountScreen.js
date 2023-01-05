import { View, Text, Button } from "react-native";
import React from "react";

export const AccountScreen = () => {
  return (
    <View>
      <Text>Account</Text>
      <Button title="Send" onPress={() => console.log("sending")} />
    </View>
  );
};

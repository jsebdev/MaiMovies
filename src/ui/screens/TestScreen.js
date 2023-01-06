import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";

export const TestScreen = ({ route, navigation }) => {
  useEffect(() => {
    console.log("6: route?.params >>>", route?.params);
  }, [route?.params]);
  return (
    <View>
      <Text>TestScreen</Text>
      <Button
        title="Go to Account"
        onPress={() => {
          navigation.push("Accnt", {
            title: "New Account title",
          });
          // console.log("12: navigation >>>", navigation);
        }}
      />
    </View>
  );
};

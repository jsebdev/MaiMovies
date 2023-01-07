import * as React from "react";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  return (
    <View style={{}}>
      <LinearGradient
        // Background Linear Gradient
        // colors={["red", "transparent"]}
        colors={["blue", "red"]}
        style={{ height: 100 }}
      />
      <LinearGradient
        // Button Linear Gradient
        // colors={["#4c669f", "#3b5998", "#192f6a"]}
        colors={["yellow", "blue", "red"]}
        style={{}}
      ></LinearGradient>
    </View>
  );
}

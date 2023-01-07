// if (
//   !new (class {
//     x;
//   })().hasOwnProperty("x")
// ) {
//   throw new Error("Transpiler is not configured correctly");
// }

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/navigation/Navigation";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Navigation />
    </NavigationContainer>
  );
}

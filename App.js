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

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}

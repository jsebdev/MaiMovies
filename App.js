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
// import { Context } from "@app/store/Context";

export default function App() {
  return (
    // <Context>
    <NavigationContainer>
      <Navigation></Navigation>
    </NavigationContainer>
    // </Context>
  );
}

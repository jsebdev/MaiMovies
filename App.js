import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Navigation } from "./src/navigation/Navigation";
import { StatusBar } from "react-native";
import { AppWrapper } from "@app/ui/components/AppWrapper";

export default function App() {
  return (
    <AppWrapper>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Navigation />
      </NavigationContainer>
    </AppWrapper>
  );
}

import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { AppWrapper } from "@app/ui/components/AppWrapper";
import { RootNavigation } from "@app/navigation/RootNavigation";

export default function App() {
  return (
    <AppWrapper>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <RootNavigation />
      </NavigationContainer>
    </AppWrapper>
  );
}

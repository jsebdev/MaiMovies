import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { AppWrapper } from "@app/ui/components/AppWrapper";
import { RootNavigation } from "@app/navigation/RootNavigation";

// todo: tabbar is not showing properly in android when normal theme is selected
// when clicking x on search view, reset the whole search
// change icon displayed when the app is installed

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

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AccountScreen } from "@app/ui/screens/AccountScreen";
import { generalScreenOptions } from "@app/ui/globalStyles";
import {
  ACCOUNT_SCREEN,
  LIST_SCREEN,
  MEDIA_NAVIGATION,
  NEW_LIST_SCREEN,
} from "@app/utils/constants";
import { NewListScreen } from "@app/ui/screens/NewListScreen";
import { ListScreen } from "@app/ui/screens/ListScreen";
import { MediaNavigation } from "./MediaNavigation";
import { MyButton } from "@app/ui/components/commonComponents/MyButton";
import { Alert } from "react-native";
import { useStore } from "@app/store/store.hook";

const Stack = createStackNavigator();

export const AccountNavigation = () => {
  const { userStore } = useStore();
  return (
    <Stack.Navigator screenOptions={generalScreenOptions}>
      <Stack.Screen name={ACCOUNT_SCREEN} component={AccountScreen} />
      <Stack.Screen
        name={NEW_LIST_SCREEN}
        options={{ headerShown: true, title: "Create new List" }}
        component={NewListScreen}
      />
      <Stack.Screen
        name={LIST_SCREEN}
        component={ListScreen}
        options={({ route, navigation }) => ({
          title: route?.params?.name,
          headerShown: true,
          headerRight: () => (
            <MyButton
              onPress={() => {
                Alert.alert("Are you sure you want to delete this list?", "", [
                  {
                    text: "Yes",
                    onPress: async () => {
                      const result = await userStore.deleteList(
                        route.params.listId
                      );
                      if (!result.success) Alert.alert("Something went wrong");
                      navigation.goBack();
                    },
                  },
                  {
                    text: "No",
                  },
                ]);
              }}
            >
              Delete List
            </MyButton>
          ),
        })}
      />
      <Stack.Screen name={MEDIA_NAVIGATION} component={MediaNavigation} />
    </Stack.Navigator>
  );
};

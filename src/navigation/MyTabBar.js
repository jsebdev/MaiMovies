import React from "react";
import { Animated, View, TouchableOpacity, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { colors } from "@app/utils/constants";
import { Paragraph } from "@app/ui/components/Paragraph";

export function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: "row", backgroundColor: colors.background }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0.4)),
        });

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            <Animated.Text style={[{ opacity }, styles.animatedText]}>
              <Paragraph style={styles.title}>{label}</Paragraph>
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    // backgroundColor: "red",
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  animatedText: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    // borderWidth: 2,
    // borderColor: "green",
    // backgroundColor: "yellow",
  },
  title: {
    // backgroundColor: "blue",
    fontWeight: "bold",
    fontSize: 16,
  },
});

MyTabBar.propTypes = {
  state: PropTypes.object.isRequired,
  descriptors: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  position: PropTypes.object.isRequired,
};

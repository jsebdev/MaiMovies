import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { pressableStyle } from "@app/ui/globalStyles";

export const MyPressable = ({
  children,
  onPress,
  rootStyle,
  pressableStyle,
}) => {
  const inheritedRootStyle = Array.isArray(rootStyle) ? rootStyle : [rootStyle];
  const inheritedPressableStyle = Array.isArray(pressableStyle)
    ? pressableStyle
    : [pressableStyle];
  return (
    <View style={[containerStyles.default, ...inheritedRootStyle]}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          pressableStyles.default({ pressed }),
          ...inheritedPressableStyle,
        ]}
      >
        {children}
      </Pressable>
    </View>
  );
};

const containerStyles = StyleSheet.create({
  default: {
    alignItems: "center",
  },
});

const pressableStyles = StyleSheet.create({
  default: ({ pressed }) => ({
    ...pressableStyle(pressed),
    borderRadius: 5,
  }),
});

MyPressable.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  pressableStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  rootStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

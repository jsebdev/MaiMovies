import { Pressable, StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { pressableStyle } from "@app/ui/globalStyles";

export const MyPressable = ({ children, onPress, style }) => {
  const inheritedStyle = Array.isArray(style) ? style : [style];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        pressableStyles.default({ pressed }),
        ...inheritedStyle,
      ]}
    >
      {children}
    </Pressable>
  );
};

const pressableStyles = StyleSheet.create({
  default: ({ pressed }) => ({
    ...pressableStyle(pressed),
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  }),
});

MyPressable.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

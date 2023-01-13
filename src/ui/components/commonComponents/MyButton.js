import { Pressable, StyleSheet, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { Paragraph } from "./Paragraph";

export const MyButton = ({
  children,
  onPress,
  rootStyle,
  pressableStyle,
  textStyle,
  variant,
}) => {
  const inheritedRootStyle = Array.isArray(rootStyle) ? rootStyle : [rootStyle];
  const inheritedPressableStyle = Array.isArray(pressableStyle)
    ? pressableStyle
    : [pressableStyle];
  const inheritedTextStyle = Array.isArray(textStyle) ? textStyle : [textStyle];
  const variantContainerStyle = variant ? pressableStyles[variant] : null;
  const variantPressableStyle = variant ? pressableStyles[variant] : null;
  const variantTextStyle = variant ? textStyles[variant] : null;
  return (
    <View
      style={[
        containerStyles.default,
        ...inheritedRootStyle,
        variantContainerStyle,
      ]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          pressableStyles.default({ pressed }),
          ...inheritedPressableStyle,
          variantPressableStyle,
        ]}
      >
        <Paragraph
          style={[textStyles.default, ...inheritedTextStyle, variantTextStyle]}
        >
          {children}
        </Paragraph>
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
    backgroundColor: pressed ? "#6c5cfa55" : "transparent",
    borderRadius: 5,
  }),
});

const textStyles = StyleSheet.create({
  default: {
    textAlign: "center",
    padding: 10,
    fontSize: 18,
    color: "#007AFF",
  },
});

MyButton.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  pressableStyle: PropTypes.object,
  rootStyle: PropTypes.object,
  textStyle: PropTypes.object,
  variant: PropTypes.oneOf(Object.keys(textStyles)),
};

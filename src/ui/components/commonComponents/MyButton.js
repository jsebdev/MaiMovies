import { StyleSheet } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { Paragraph } from "./Paragraph";
import { MyPressable } from "./MyPressable";

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
  const variantTextStyle = variant ? textStyles[variant] : null;
  return (
    <MyPressable
      rootStyle={inheritedRootStyle}
      pressableStyle={inheritedPressableStyle}
      onPress={onPress}
    >
      <Paragraph
        style={[textStyles.default, ...inheritedTextStyle, variantTextStyle]}
      >
        {children}
      </Paragraph>
    </MyPressable>
  );
};

const textStyles = StyleSheet.create({
  default: {
    textAlign: "center",
    padding: 10,
    fontSize: 20,
    color: "#007AFF",
  },
});

MyButton.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  pressableStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  rootStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  variant: PropTypes.oneOf(Object.keys(textStyles)),
};

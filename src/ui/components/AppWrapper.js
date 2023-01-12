import { Platform, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";
import { BackgroundView } from "@components/commonComponents/BackgroundView";

export const AppWrapper = ({ children }) => {
  return (
    <BackgroundView>
      <View
        style={{
          paddingTop: Platform.OS === "ios" ? 40 : 0,
          height: "100%",
        }}
      >
        {children}
      </View>
    </BackgroundView>
  );
};

AppWrapper.propTypes = {
  children: PropTypes.node,
};

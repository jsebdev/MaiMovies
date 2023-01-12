import { View, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import PropTypes from "prop-types";

export const ImageScreen = ({ route, navigation }) => {
  const { imageUrl } = route.params;
  console.log("7: imageUrl >>>", imageUrl);
  return (
    <View>
      <Pressable style={styles.container} onPress={() => navigation.goBack()}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

ImageScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      imageUrl: PropTypes.string,
    }),
  }),
  navigation: PropTypes.object,
};

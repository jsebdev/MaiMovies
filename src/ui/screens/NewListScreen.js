import React, { useState } from "react";
import { Paragraph } from "../components/commonComponents/Paragraph";
import { BackgroundView } from "../components/commonComponents/BackgroundView";
import { StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { colors } from "@app/utils/constants";
import { MyButton } from "../components/commonComponents/MyButton";
import { useStore } from "@app/store/store.hook";
import PropTypes from "prop-types";
import { Errors } from "../components/commonComponents/Errors";

export const NewListScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState([]);
  const { userStore } = useStore();
  const createList = async () => {
    const listInfo = { name, description };
    const result = await userStore.createNewList(listInfo);
    if (result.success !== true) {
      setErrors(result.errors);
      return;
    }
    navigation.goBack();
  };
  return (
    <BackgroundView style={styles.mainContainer}>
      <View style={styles.form}>
        <Paragraph>Name:</Paragraph>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
        <Paragraph>Description:</Paragraph>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          multiline={true}
        />
        <MyButton onPress={createList}>Create List</MyButton>
        <Errors errors={errors} style={styles.errors} />
      </View>
    </BackgroundView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  form: {
    width: "100%",
    padding: 10,
    marginTop: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.bright,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 30,
    fontSize: 20,
    color: colors.bright,
    padding: 10,
  },
  textArea: {
    height: 200,
  },
  errors: {
    marginTop: 20,
  },
});

NewListScreen.propTypes = {
  navigation: PropTypes.object,
};

import { View, StyleSheet } from "react-native";
import React from "react";
import { Text } from "react-native-paper";

type Props = {
  error: string;
};

export const ErrorMessage = (props: Props) => {
  if (!props?.error) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text} variant="bodyMedium">
        {props.error}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#f0a6a6",
  },

  text: {
    color: "#47292a",
  },
});

export default ErrorMessage;

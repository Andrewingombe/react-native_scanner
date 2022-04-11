import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Scanner = () => {
  return (
    <View style={styles.container}>
      <Text>Scanner Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

import { View, Text, StyleSheet } from "react-native";
import React from "react";

export const ScanHistory = () => {
  return (
    <View style={styles.container}>
      <Text>scanHistory</Text>
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

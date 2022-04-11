import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export const Home = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate("Scanner");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>Click here to scan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "steelblue",
    padding: 20,
    borderRadius: 5,
  },
  btnText: {
    fontSize: 18,
    color: "#fff",
  },
});

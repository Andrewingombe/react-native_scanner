import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const Home = ({ navigation }) => {
  const handlePress = () => {
    navigation.navigate("Scanner");
  };

  const handleHistory = () => {
    navigation.navigate("Scanned");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headingText}>BarCode Scanner</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={require("../assets/qr_code_img.png")}
          style={styles.image}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>Click here to scan</Text>
        <MaterialIcons name="qr-code-scanner" size={22} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={handleHistory}>
        <Text style={styles.btnText}>Scan history</Text>
        <MaterialIcons name="history" size={22} color="#fff" />
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
  headingText: {
    fontSize: 35,
    fontWeight: "bold",
    color: "steelblue",
    marginTop: 40,
  },
  btn: {
    backgroundColor: "steelblue",
    padding: 20,
    width: "80%",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  btnText: {
    fontSize: 18,
    color: "#fff",
  },
  imageWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 300,
  },
});

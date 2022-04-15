import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ScanHistory = () => {
  const [scannedData, setScannedData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@scanned_codes");
        // await AsyncStorage.clear();
        // return jsonValue != null ? JSON.parse(jsonValue) : null;

        if (jsonValue != null) {
          setScannedData([...scannedData, ...JSON.parse(jsonValue)]);
        } else {
          alert("There is no data to display");
        }
      } catch (e) {
        // error reading value
        alert(e.message);
      }
    };

    getData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.headingTitle}>Scan history</Text>
      </View>
      {scannedData ? (
        scannedData.map((item, index) => (
          <View style={styles.data} key={index}>
            <Text style={styles.type}>Type: {item.type}</Text>
            <Text>Data: {item.data}</Text>
          </View>
        ))
      ) : (
        <Text>There is no data to display</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 10,
  },
  headingTitle: {
    textAlign: "center",
    color: "steelblue",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  data: {
    borderColor: "steelblue",
    borderWidth: 1,
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    flex: 1,
  },
  type: {
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
});

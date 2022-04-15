import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { globalStyles } from "../styles/globalStyles";

export default function Scanner2() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("No scans yet.");
  const [scannedData, setScannedData] = useState([]);

  // ---------------------------
  // Set and store data in AsyncStorage
  // ---------------------------
  const saveData = async (scannedData) => {
    try {
      const jsonValue = JSON.stringify(scannedData);
      await AsyncStorage.setItem("@scanned_codes", jsonValue);
    } catch (error) {
      alert(error.message);
    }
  };

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // -------------------------------
  // Request for camera permission
  // -------------------------------
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    setScannedData([...scannedData, { type: type, data: data }]);
    saveData(scannedData);
  };

  // -------------------------------
  // Check for permission and return screens accordingly
  // -------------------------------
  if (hasPermission === null) {
    return (
      <View style={globalStyles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={globalStyles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // -------------------------------
  // Display the actual screen to scan barcode or qrcode
  // -------------------------------
  return (
    <View style={globalStyles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 520, width: 520 }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && (
        <Button
          title={"Scan barcode"}
          onPress={() => setScanned(false)}
          color="steelblue"
        />
      )}
    </View>
  );
}

// -------------------------------
// Styling for the scanner screen
// -------------------------------

const styles = StyleSheet.create({
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "steelblue",
  },
});

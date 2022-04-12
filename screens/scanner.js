import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import BarcodeMask from "react-native-barcode-mask";

// ---------------------------
// Constants
// ---------------------------
const finderWidth = 280;
const finderHeight = 230;
const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

export const Scanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState([]);

  // ---------------------------
  // Set and store data in AsyncStorage
  // ---------------------------
  const saveData = async (data) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem("@scanned_codes", jsonValue);
    } catch (error) {
      alert(error.message);
    }
  };

  // ---------------------------
  // Get stored data from AsyncStorage
  // ---------------------------

  // ---------------------------
  // Request camera permission on page load
  // ---------------------------
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // ---------------------------
  // Barcode scanner handler
  // ---------------------------
  const handleBarcodeScanned = (scanningResult) => {
    if (!scanned) {
      const { type, data, bounds: { origin } = {} } = scanningResult;
      const { x, y } = origin;

      if (
        x >= viewMinX &&
        y >= viewMinY &&
        x <= viewMinX + finderWidth / 2 &&
        y <= viewMinY + finderHeight / 2
      ) {
        let scannedData = [];

        setScanned(true);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        scannedData.push({
          type: type,
          data: data,
        });

        saveData(scannedData);
      }
    }
  };

  if (hasPermission === null) {
    return <Text style={styles.permission}>Camera permission is required</Text>;
  }

  if (hasPermission === false) {
    return <Text style={styles.permission}>Access to Camera Not granted</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <BarCodeScanner
        onBarCodeScanned={handleBarcodeScanned}
        type={type}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        style={[StyleSheet.absoluteFillObject, styles.container]}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row",
          }}
        >
          <TouchableOpacity
            style={{ flex: 1, alignItems: "flex-end" }}
            onPress={() => {
              setType(
                type === BarCodeScanner.Constants.Type.back
                  ? BarCodeScanner.Constants.Type.front
                  : BarCodeScanner.Constants.Type.back
              );
            }}
          >
            <Text style={{ fontSize: 18, margin: 5, color: "white" }}>
              Flip
            </Text>
          </TouchableOpacity>
        </View>
        <BarcodeMask edgeColor="steelblue" showAnimatedLine />
        {scanned && (
          <Button title="Scan Again" onPress={() => setScanned(false)} />
        )}
      </BarCodeScanner>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  permission: {
    fontSize: 20,
  },
});

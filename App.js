import { StatusBar } from "expo-status-bar";
import { Home } from "./screens/home";
// import { Scanner } from "./screens/scanner";
import Scanner2 from "./screens/scanner2";
import { ScanHistory } from "./screens/scanHistory";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="QrScan" component={Home} />
        <Stack.Screen name="Scanner" component={Scanner2} />
        <Stack.Screen name="Scanned" component={ScanHistory} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

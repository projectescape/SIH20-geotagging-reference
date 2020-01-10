import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Camera from "./src/Camera";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Camera />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {

  return (
    <View style={{ height: "100%" }}>
      <LinearGradient
        colors={['#ced1cd', '#9b9d9b', '#696a68', '#363636']}
        style={styles.container}
        start={{ x: 0, y: 0.1 }}
        end={{ x: 0, y: 0.5 }}
      >
        <View style={styles.form}>

        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    backgroundColor: "black"

  },
  input: {
    borderWidth: 3,
    padding: 10,
    borderColor: "#000",
    borderRadius: 50,
  },
})
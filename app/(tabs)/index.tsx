import { useState } from "react";
import { StyleSheet, Text, TextInput, View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Login } from "@/components/Login";
import { Image } from 'expo-image';
import loginbg from "../assets/images/ui/login_bg.jpg";

export default function Index() {
  return (
    <View style={{ height: "100%" }}>
      <Text>Delivery</Text>
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
    position: "absolute",
    backgroundColor: "#bfbfbf",
    borderRadius: 24,
    padding: 24,
  },
  input: {
    borderWidth: 3,
    padding: 10,
    borderColor: "#000",
    borderRadius: 50,
  },
})
import { useState } from "react";
import { StyleSheet, Text, TextInput, View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Login } from "@/components/Login";
import loginbg from "../assets/images/ui/login_bg.jpg";

export default function Index() {

  return (
    <View style={{ height: "100%" }}>
      <ImageBackground
      source={loginbg}>

        <LinearGradient
          colors={['#ced1cd', '#9b9d9b', '#696a68', '#363636']}
          style={styles.container}
          start={{ x: 0, y: 0.1 }}
          end={{ x: 0, y: 0.5 }}
        >
          <View style={styles.form}>
            <Login />
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundImage: loginbg,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
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
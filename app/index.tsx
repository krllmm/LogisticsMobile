import { useState } from "react";
import { StyleSheet, Text, TextInput, View, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Login } from "@/components/Login";
import { Image } from 'expo-image';
import loginbg from "../assets/images/ui/login_bg.jpg";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

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
          <Login />
        </View>
        {/* <Image
          style={{
            flex: 1,
            width: '100%',
            marginTop: 150,
            opacity: .7
          }}
          source={loginbg}
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={500}
        /> */}
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
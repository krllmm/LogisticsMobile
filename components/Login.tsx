import { authService } from "@/services/api/endpoints/auth";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { TextInput, View, StyleSheet, Text, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';

export const Login = () => {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const checkUser = async () => {
    const login = await AsyncStorage.getItem('user_login');

    if (login) {
      router.navigate("/(tabs)/delivery")
    }
  }

  const handleButtonPress = () => {
    authService.login({ login: login, password: password })
      .then(async result => {
        if (result["message"] === "Вход выполнен успешно") {
          await AsyncStorage.setItem('user_login', login);
          router.navigate("/(tabs)/delivery")
        } else {
          alert("Ошибка авторизации")
        }
      })
  }

  useEffect(() => {
    checkUser()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход в систему</Text>

      <TextInput
        style={styles.input}
        value={login}
        onChangeText={setLogin}
        placeholder="Логин"
      />

      <View style={styles.passwordContainer}>

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Пароль"
          secureTextEntry={!passwordVisibility}
        />

        <Pressable style={{ position: "absolute", right: 0, marginRight: 12 }}>
          {
            passwordVisibility 
                ? <Ionicons name="eye-off" size={24} color="black" onPress={() => setPasswordVisibility(!passwordVisibility)}/> 
                : <Ionicons name="eye" size={24} color="black" onPress={() => setPasswordVisibility(!passwordVisibility)}/>
          }
        </Pressable>

      </View>

      <View style={styles.divider}></View>

      <Pressable style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonTitle}>Войти</Text>
      </Pressable>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 3,
    padding: 10,
    borderColor: "#000",
    borderRadius: 14,
    minWidth: 240,
  },
  button: {
    backgroundColor: "#363636",
    textAlign: "center",
    borderWidth: 3,
    padding: 10,
    borderColor: "#000",
    borderRadius: 14,
    minWidth: 240,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f9f9f9",
    textAlign: "center",
  },
  divider: {
    width: "100%",
    backgroundColor: "#000",
    borderRadius: 4,
    height: 2,
    marginVertical: 6,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  }
})
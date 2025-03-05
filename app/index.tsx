import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")

  return (
    <View style={styles.container}>
      <Text>Войдите в систему</Text>

      <TextInput 
        style={styles.input}
        value={login}
        onChangeText={setLogin}
        placeholder="Логин"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Пароль"
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 8,
    backgroundColor: "#ced1cd",
    height: "100%",
  },
  input: {
    borderWidth: 3,
    padding: 10,
    borderColor: "#000",
    borderRadius: 50,
  },
})
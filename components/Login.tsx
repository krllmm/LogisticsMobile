import React, { useState } from "react";
import { TextInput, View, StyleSheet, Text} from "react-native";

export default function Login() {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    
    return 
    (
    
        
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
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    input: {
      borderWidth: 3,
      padding: 10,
      borderColor: "#000",
      borderRadius: 50,
    },
  })
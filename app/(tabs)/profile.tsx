import { Header } from "@/components/Header";
import { authService } from "@/services/api/endpoints/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from "react";
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, TextInput, View, ImageBackground, Pressable } from "react-native";

interface Driver {
  age: number, 
  category: string,
  experience: number,
  first_name: string,
  second_name: string
}

export default function Index() {
  const [driver, setDriver] = useState<Driver>();

  const getData = async () => {
    const login = await AsyncStorage.getItem('user_login');
    console.log(login);

    await authService.getCurrentDriver({login: login || ""})
      .then(res => {
        console.log(res)
        setDriver(res)
      })
      .catch(error => console.log(error))
  }

  useEffect(() => {
    getData()

    // console.log("delivery: ", deliveries)
  }, [])

  const handleLogout = () => {
      router.replace("./index");
  }

  return (
    <>
      <Header title="Профиль"/>
      <View style={styles.driversCard}>
        <View>
          <FontAwesome5 name="user-alt" size={24} color="black" />
        </View>
        <View>
          <Text style={styles.name}>{driver?.first_name} {driver?.second_name}</Text>
        </View>
      </View>

      <Pressable style={styles.driversCard} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="black" />
        <Text style={styles.logout}>Выйти</Text>
      </Pressable>
      
    </>
  );
}

const styles = StyleSheet.create({
  driversCard: {
    borderWidth: 2,
    borderColor: "lightgrey",
    borderRadius: 24,
    padding: 18,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
  },
  name: {
    marginLeft: 14,
    fontSize: 24,
    fontWeight: 700,
  },
  logout: {
    fontSize: 18,
    marginLeft: 14,
  }
})
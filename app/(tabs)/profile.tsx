import { Header } from "@/components/Header";
import { authService } from "@/services/api/endpoints/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from "react";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useState } from "react";
import { router } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Text, View, Pressable, ActivityIndicator } from "react-native";
import ErrorScreen from "@/components/ErrorScreen";

interface Driver {
  age: number,
  category: string[],
  experince: number,
  first_name: string,
  second_name: string
}

export default function Index() {
  const [driver, setDriver] = useState<Driver>();
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState("")

  const getData = async () => {
    setApiError("")
    setLoading(true)
    const login = await AsyncStorage.getItem('user_login');

    await authService.getCurrentDriver({ login: login || "" })
      .then(res => {
        if (!res) {
          throw new Error('Ошибка на сервере');
        } else {
          setDriver(res)
        }
      })
      .catch(() => {
        setApiError("Не удалось получить данные. Возможно сервер на данный момент не работает.");
      })
      .finally(() => setTimeout(() => { setLoading(false) }, 1000))
  }

  useEffect(() => {
    getData()
  }, [])

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user_login")
    router.replace('/(auth)');
  }

  return (
    <>
      <Header title="Профиль" backIcon={false} settingsIcon={true}/>
      {
        (apiError != "") && !loading ?
          <ErrorScreen apiError={apiError} getData={getData}/>
          : ""
      }
      {
        loading ?
          <ActivityIndicator size={64} color="#000" style={{ flex: 1 }} />
          : 
          apiError == "" ? <>
            <View style={styles.driversCard}>
              <View>
                <FontAwesome5 name="user-alt" size={24} color="black" />
              </View>
              <View>
                <Text style={styles.name}>{driver?.first_name} {driver?.second_name}</Text>
              </View>
            </View>

            <View style={{ ...styles.driversCard, ...styles.infoContainer }}>
              <Text style={styles.info}>Категория: {driver?.category.join(", ")}</Text>
              <Text style={styles.info}>Опыт: {driver?.experince}</Text>
              <Text style={styles.info}>Возраст: {driver?.age}</Text>
            </View>

            <Pressable style={styles.driversCard} onPress={handleLogout}>
              <MaterialIcons name="logout" size={24} color="black" />
              <Text style={styles.rightText}>Выйти</Text>
            </Pressable>
          </> : ""
      }
    </>
  );
}

const styles = StyleSheet.create({
  driversCard: {
    backgroundColor: "#fff",
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
  },
  name: {
    marginLeft: 14,
    fontSize: 24,
    fontWeight: 700,
  },
  infoContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  info: {
    fontSize: 18,
  },
  rightText: {
    fontSize: 18,
    marginLeft: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
    alignItems: "center",
  },
  errorText: {
    marginTop: 8,
    fontSize: 18,
    textAlign: "center",
    color: "grey"
  },
})
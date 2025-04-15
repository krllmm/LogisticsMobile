import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, ImageBackground } from "react-native";
import { Header } from "@/components/Header";
import React from "react";
import { authService } from "@/services/api/endpoints/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from '@expo/vector-icons/Feather';

interface Deliveries {
  id: number,
  from: string,
  to: string,
  amount: number,
  product_id: number,
}

export default function Index() {
  const [deliveries, setDeliveries] = useState<Deliveries[]>([]);

  const getData = async () => {
    const login: string = await AsyncStorage.getItem('user_login') || "";
    console.log(login);

    await authService.getDeliveries({login: login})
      .then(res => {
        // console.log(res)
        setDeliveries(res)
      })
      .catch(error => console.log("ошибка: " + error))
  }

  useEffect(() => {
    getData()

    console.log("delivery: ", deliveries)
  }, [])

  return (
    <>
      <Header title="Перевозки" />
      <View>
        {
          deliveries.map((d) => (
            <View style={styles.container} key={d.id}>
              <Text style={styles.title}>
                <Feather name="package" size={20} color="black" /> {d.from} -{">"} {d.to} 
              </Text>
              <View style={styles.divider}></View>
              <Text style={styles.detailsText}>Количество: {d.amount}</Text>
              <Text style={styles.detailsText}>Товар: {d.product_id}</Text>
            </View>
          ))
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
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
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
  },
  detailsText: {
    fontSize: 16,
    marginTop: 8,
  },
  divider: {
    backgroundColor: "lightgrey",
    height: 2,
    marginVertical: 8,
  }
})
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View, ImageBackground } from "react-native";
import { Header } from "@/components/Header";
import React from "react";
import { authService } from "@/services/api/endpoints/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Feather from '@expo/vector-icons/Feather';
import { Link } from "expo-router";

import Entypo from '@expo/vector-icons/Entypo';
import { DeliveryCard } from "@/components/DeliveryCard";

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

    await authService.getDeliveries({ login: login })
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
            <DeliveryCard delivery={d}/>
          ))
        }
      </View>
    </>
  );
}
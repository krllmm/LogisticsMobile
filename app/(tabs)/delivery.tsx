import { useEffect, useState } from "react";
import { View } from "react-native";
import { Header } from "@/components/Header";
import React from "react";
import { authService } from "@/services/api/endpoints/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeliveryCard } from "@/components/DeliveryCard";

interface Deliveries {
  id: number,
  from: string,
  from_address: string,
  to: string,
  to_address: string,
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
          deliveries.map((d, index) => (
            <DeliveryCard delivery={d} key={index}/>
          ))
        }
      </View>
    </>
  );
}
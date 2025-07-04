import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Header } from "@/components/Header";
import React from "react";
import { authService } from "@/services/api/endpoints/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeliveryCard } from "@/components/DeliveryCard";
import ErrorScreen from "@/components/ErrorScreen";
import DateDivider from "@/components/DateDivider";
import { itemService } from "@/services/api/endpoints/item";
import Ionicons from '@expo/vector-icons/Ionicons';

interface Deliveries {
  id: string,
  from: string,
  from_address: string,
  to: string,
  to_address: string,
  amount: number,
  product_id: number,
  date: string,
}

export default function Index() {
  const [deliveries, setDeliveries] = useState<Deliveries[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const getData = async () => {
    setApiError("")
    setLoading(true)
    const login: string = await AsyncStorage.getItem('user_login') || "";

    await authService.getDeliveries({ login: login })
      .then(async res => {
        if (!res) {
          throw new Error('Ошибка на сервере');
        } else {
          setDeliveries(res)
        }
      })
      .catch(() => {
        setApiError("Не удалось получить данные. Возможно сервер на данный момент не работает.");
      }
      )
      .finally(() => setTimeout(() => { setLoading(false) }, 1000))
  }

  useEffect(() => {
    getData()
  }, [])

  const handleCloseDelivery = async (id: string) => {
    const login: string = await AsyncStorage.getItem('user_login') || "";
    console.log(id, login)
    
    await itemService.closeDelivery({ deliveryId: id, driverLogin: login})
    .then(res => console.log(res))
    .catch()
    .finally(() => getData())
  }

  return (
    <>
      <Header title="Перевозки" backIcon={false} />
      {
        (apiError != "") && !loading ?
          <>
            <ErrorScreen apiError={apiError} getData={getData} />
          </>
          : ""
      }
      {
        loading
          ?
          <ActivityIndicator size={64} color="#000" style={{ flex: 1 }} />
          :
          (deliveries.length == 0) && !apiError ?
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Перевозки пока не назначены</Text>
              <Pressable onPress={() => getData()}>
                <Text style={{ ...styles.emptyText, color: "black", marginTop: 12, textDecorationLine: "underline" }}>Попробовать еще раз</Text>
              </Pressable>
            </View>
            : <ScrollView>
              {
                deliveries.map((d, index) => (
                  <DeliveryCard delivery={d} key={index} closeDelivery={handleCloseDelivery}/>
                ))
              }
              <Pressable onPress={() => getData()} style={{ alignItems: "center", marginTop: 12 }}>
              <Ionicons name="reload" size={36} color="black" />
              </Pressable>
            </ScrollView>


      }
    </>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
    alignItems: "center",
  },
  emptyText: {
    marginTop: 8,
    fontSize: 18,
    textAlign: "center",
    color: "grey"
  },
})

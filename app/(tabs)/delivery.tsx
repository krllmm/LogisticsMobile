import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, StyleSheet, Pressable } from "react-native";
import { Header } from "@/components/Header";
import React from "react";
import { authService } from "@/services/api/endpoints/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeliveryCard } from "@/components/DeliveryCard";
import Animated, { FadeInDown } from 'react-native-reanimated';
import Entypo from '@expo/vector-icons/Entypo';

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
        }else{
          console.log("data: " + res)
          setDeliveries(res)
        }
      })
      .catch((err: any) => {
        console.log(err);
        setApiError("Не удалось получить данные. Возможно сервер на данный момент не работает.");
      }
      )
      .finally(() => setTimeout(() => {setLoading(false)}, 1000))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Header title="Перевозки" backIcon={false} />
      {
        apiError != "" ?
          <>
            <View style={styles.errorContainer}>
              <Entypo name="emoji-sad" size={64} color="grey" />
              <Text style={styles.errorText}>{apiError}</Text>
              <Pressable onPress={() => getData()}>
                <Text style={{ ...styles.errorText, color: "black", marginTop: 12, textDecorationLine: "underline" }}>Попробовать еще раз</Text>
              </Pressable>
            </View>
          </>
          : ""
      }
      {
        loading
          ?
          <ActivityIndicator size={64} color="#000" style={{ flex: 1 }} />
          :
          <View>
            {
              deliveries.map((d, index) => (
                <Animated.View entering={FadeInDown.duration((index + 1) * 200)} key={index}>
                  <DeliveryCard delivery={d} />
                </Animated.View>
              ))
            }
          </View>
      }
    </>
  );
}

const styles = StyleSheet.create({
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
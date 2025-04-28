import React, { useEffect, useState } from "react"
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, TextInput, View, ImageBackground, ActivityIndicator } from "react-native";
import { itemService } from "@/services/api/endpoints/item";
import { Header } from "@/components/Header";
import ErrorScreen from "@/components/ErrorScreen";

interface Product {
  name: string,
  description: string,
  weight: number,
  dimentions: string,
}

export default function Product() {
  const [product, setProduct] = useState<Product>();
  const { id } = useLocalSearchParams();

  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState("")

  const getProduct = async () => {
    setApiError("")
    setLoading(true)

    await itemService.getProduct({ id: id[0] })
      .then(res => {
        if (!res) {
          throw new Error('Ошибка на сервере');
        } else {
          setProduct(res)
        }
      })
      .catch(() => {
        setApiError("Не удалось получить данные. Возможно сервер на данный момент не работает.");
      })
      .finally(() => setTimeout(() => { setLoading(false) }, 1000))
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <>
      <Header title="Товар" backIcon={true} />
      {
        (apiError != "") && !loading ?
          <>
            <ErrorScreen apiError={apiError} getData={getProduct} />
          </>
          : ""
      }
      {
        loading ?
          <ActivityIndicator size={64} color="#000" style={{ flex: 1 }} />
          :
          apiError == "" ? <>
            <View style={styles.container}>
              <Text style={styles.textInfo}>{product?.name}</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.textInfo}>{product?.description}</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.textInfo}>Вес: {product?.weight} кг</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.textInfo}>Габариты: {product?.dimentions.split(", ").join("см, ")}см</Text>
            </View>
          </> : ""
      }

    </>
  )
}

const styles = StyleSheet.create({
  container: {
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
  },
  textInfo: {
    fontSize: 18
  }
})
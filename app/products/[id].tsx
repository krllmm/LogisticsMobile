import React, { useEffect, useState } from "react"
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, TextInput, View, ImageBackground } from "react-native";
import { itemService } from "@/services/api/endpoints/item";

interface Product {
  name: string,
  description: string,
  weight: number,
  dimentions: string,
}

export default function Product() {
  const [product, setProduct] = useState<Product>();
  const { id } = useLocalSearchParams();

  const getProduct = async () => {
    await itemService.getProduct({ id: id[0] })
      .then(result => setProduct(result))
      .catch(e => console.log(e))
  }

  useEffect(() => {
    getProduct()
  }, [])

  return (
    <>
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
    </>
  )
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
  textInfo: {
    fontSize: 18
  }
})
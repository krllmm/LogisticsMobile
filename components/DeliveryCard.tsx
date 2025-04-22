import { Entypo, Feather } from "@expo/vector-icons"
import { Link } from "expo-router"
import React from "react"
import { useState } from "react"
import { View, Text, StyleSheet } from "react-native"

type DeliveryCardProps = {
  delivery: any
}

export const DeliveryCard = ({ delivery }: DeliveryCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <View style={styles.container} key={delivery.id}>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Feather name="package" size={24} color="black" />
        <Text style={styles.title}>
          {delivery.from} -{">"} {delivery.to}
        </Text>
        <Entypo name={isOpen ? "chevron-thin-up" : "chevron-thin-down"} size={24} color="black" style={{ marginLeft: "auto" }} onPress={() => setIsOpen(!isOpen)} />
      </View>
      {
        isOpen && <View>
          <View style={styles.divider}></View>
          <Text style={styles.detailsText}>Количество: {delivery.amount}</Text>
          <Text style={styles.detailsText}>
            <Link
              href={{
                pathname: '/products/[id]',
                params: { id: delivery.product_id.toString() },
              }}>
              Товар
            </Link>
          </Text>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
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
    marginLeft: 8,
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
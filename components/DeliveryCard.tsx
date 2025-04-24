import { Entypo, Feather } from "@expo/vector-icons"
import { Link } from "expo-router"
import React from "react"
import { useState } from "react"
import { View, Text, StyleSheet, Pressable, Linking, Platform } from "react-native"

type DeliveryCardProps = {
  delivery: any
}

export const DeliveryCard = ({ delivery }: DeliveryCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")

  const getCoordinatesFromAddress = async (address: string) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
  
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Diplom/1.0 kirilenkich@gmail.com' // обязателен!
        }
      });
      const data = await response.json();
      if (data.length > 0) {
        return `${parseFloat(data[0].lat)},${parseFloat(data[0].lon)}`;
        // console.log(coordsString); 
        // return {
        //   latitude: parseFloat(data[0].lat),
        //   longitude: parseFloat(data[0].lon),
        // };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Ошибка геокодирования:', error);
      return null;
    }
  };
  
  const handleOpenMaps = async () => {
    console.log(delivery.from_address)
    const origin = await getCoordinatesFromAddress(`${delivery.from_address}, ${delivery.from}`)
    if(origin){
      setOrigin(origin)
    }
    const destination = await getCoordinatesFromAddress(`${delivery.to_address}, ${delivery.to}`)
    if(destination){
      setOrigin(destination)
    }
    console.log(origin, destination)
    console.log(`https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`)

    if (Platform.OS === 'android') {
      const url = `google.navigation:q=${destination}&origin=${origin}`;
      Linking.openURL(url);
    } else {
      const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
      Linking.openURL(url);
    }
  }
  
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
          <Text style={styles.detailsText}>Старт: {delivery.from_address}</Text>
          <Text style={styles.detailsText}>До: {delivery.to_address}</Text>

          <Pressable style={styles.button} onPress={handleOpenMaps}>
              <Text style={{ fontSize: 16 }}>Построить маршрут</Text>
          </Pressable>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
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
  },
  button: {
    backgroundColor: '#ced1cd',
    alignSelf: "flex-end",
    padding: 10,
    marginTop: 10,
    borderRadius: 12,
    borderColor: "#363636",
    borderWidth: 2,
  },
})
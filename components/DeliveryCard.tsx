import { Entypo, Feather } from "@expo/vector-icons"
import { Link } from "expo-router"
import React, { useEffect } from "react"
import { useState } from "react"
import { View, Text, StyleSheet, Pressable, Linking, Platform, Modal } from "react-native"
import Animated, { FadeInDown } from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { format } from 'date-fns';

type DeliveryCardProps = {
  delivery: any
  closeDelivery: (id: string) => void,
}

export const DeliveryCard = ({ delivery, closeDelivery }: DeliveryCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [origin, setOrigin] = useState("")
  const [destination, setDestination] = useState("")
  const [showButton, setShowButton] = useState(false)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  const getCoordinatesFromAddress = async (address: string) => {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Diplom/1.0 kirilenkich@gmail.com'
        }
      });
      const data = await response.json();
      if (data.length > 0) {
        return `${parseFloat(data[0].lat)},${parseFloat(data[0].lon)}`;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Ошибка геокодирования:', error);
      return null;
    }
  };

  useEffect(() => {
    const time = new Date(delivery.date["$date"])
    const checkTime = () => {
      const now = new Date();
      const unlockTime = new Date(time.getTime() + 60 * 60 * 1000);
      if (now >= unlockTime) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    checkTime();
    const intervalId = setInterval(checkTime, 60 * 1000 * 5);

    return () => clearInterval(intervalId);
  }, [delivery.date]);

  const handleOpenMaps = async () => {
    console.log(delivery.from_address)
    const origin = await getCoordinatesFromAddress(`${delivery.from_address}, ${delivery.from}`)
    if (origin) {
      setOrigin(origin)
    }
    const destination = await getCoordinatesFromAddress(`${delivery.to_address}, ${delivery.to}`)
    if (destination) {
      setDestination(destination)
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

  const handleCloseDelivery = () => {
    setConfirmModalOpen(false)
  }

  return (
    <>
      <View style={styles.container} key={delivery.id}>

        <Animated.View
          entering={FadeInDown.duration((delivery.id + 1) * 250)}
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Feather name="package" size={24} color="#8EBB8E" />
          <Text style={styles.title}>
            {delivery.from} -{">"} {delivery.to}
          </Text>
          <Entypo name={isOpen ? "chevron-thin-up" : "chevron-thin-down"}
            size={24}
            color="black"
            style={{ marginLeft: "auto" }}
            onPress={() => setIsOpen(!isOpen)} />
        </Animated.View>

        {
          isOpen &&
          <View>
            <View style={styles.divider}></View>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18, fontWeight: 600 }}>Статус</Text>
              <View style={{ backgroundColor: '#8EBB8E', borderRadius: 16, padding: 6, paddingHorizontal: 10, marginLeft: "auto" }}>
                <Text>Доставляется</Text>
              </View>
            </View>

            <View style={{ marginVertical: 10, display: "flex", flexDirection: "row", alignItems: "center" }}>
              <Feather name="clock" size={16} color="black" style={{ marginRight: 6 }} />
              <Text style={{ fontSize: 16, marginLeft: 2 }}>
                Ожидается: {format(new Date(delivery.date["$date"]), 'dd.MM.yyyy HH:mm')}
              </Text>
            </View>

            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginVertical: 14 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ opacity: .5 }}>Из</Text>
                <Text style={{ fontSize: 16, fontWeight: 500 }}>{delivery.from_address}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={{ opacity: .5 }}>До</Text>
                <Text style={{ fontSize: 16, fontWeight: 500 }}>{delivery.to_address}</Text>
              </View>
            </View>

            <Pressable style={styles.productbutton}>
              <Link
                href={{
                  pathname: '/products/[id]',
                  params: { id: delivery.product_id.toString() },
                }}>
                <Text style={{...styles.textStyle, color: "black"}}>Просмотреть товар</Text>
              </Link>
            </Pressable>

            <Pressable style={styles.button} onPress={handleOpenMaps}>
              <Text style={styles.textStyle}><MaterialCommunityIcons name="map-marker-radius" size={16} color="white" /> Маршрут</Text>
            </Pressable>

            {
              showButton &&
              <Pressable style={styles.button} onPress={() => setConfirmModalOpen(true)}>
                <Text style={styles.textStyle}>Закрыть перевозку</Text>
              </Pressable>
            }

          </View>
        }

        <Modal
          visible={confirmModalOpen}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{ fontSize: 16, color: "black", fontWeight: 600, marginBottom: 8 }}>Подтвердите завершение перевозки</Text>
              <View style={{ display: "flex", flexDirection: "row", gap: 8 }}>
              <Pressable
                style={{...styles.button, backgroundColor: "rgb(255, 64, 19)" }}
                onPress={() => setConfirmModalOpen(false)}>
                <Text style={styles.textStyle}>Отмена</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={() => closeDelivery(delivery.id)}>
                <Text style={styles.textStyle}>Завершить</Text>
              </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
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
    marginVertical: 14,
  },
  productbutton: {
    borderWidth: 1,
    borderColor: '#8EBB8E',
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    borderRadius: 12,
  },
  button: {
    backgroundColor: '#8EBB8E',
    alignItems: "center",
    padding: 10,
    marginTop: 10,
    borderRadius: 12,
  },




  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    fontSize: 16, 
    color: "white", 
    fontWeight: 600
  }
})
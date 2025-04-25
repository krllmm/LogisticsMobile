import { Header } from "@/components/Header";
import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";

export default function Settings() {
  return (
    <>
      <Header title="Настройки" backIcon={true}/>
      <View style={styles.container}>
        <Text>Настройки</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
})
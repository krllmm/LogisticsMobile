import { Entypo } from "@expo/vector-icons";
import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";

interface ErrorScreenProps {
  apiError: string,
  getData: () => void,
}

export default function ErrorScreen({ apiError, getData }: ErrorScreenProps) {
  return (
    <>
      <View style={styles.errorContainer}>
        <Entypo name="emoji-sad" size={64} color="grey" />
        <Text style={styles.errorText}>{apiError}</Text>
        <Pressable onPress={() => getData()}>
          <Text style={{ ...styles.errorText, color: "black", marginTop: 12, textDecorationLine: "underline" }}>Попробовать еще раз</Text>
        </Pressable>
      </View>
    </>
  )
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
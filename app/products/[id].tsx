import React from "react"
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, TextInput, View, ImageBackground } from "react-native";

export default function Product () {
    const { id } = useLocalSearchParams();

    return (
        <>
            <Text>{id}</Text>
        </>
    )
}
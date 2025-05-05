import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DateDivider({ children }: { children: React.ReactNode }) {
    return (
        <View style={styles.container}>
            <View style={styles.line}/>
            <Text style={styles.text}>{children}</Text>
            <View style={styles.line}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        display: "flex",
        flexDirection: "row",
        // justifyContent: "center",
    },
    line: {
        backgroundColor: "lightgrey",
        height: 2,
        flex: 1,
        marginVertical: 8,
    },
    text: {
        marginHorizontal: 16,
        opacity: .5,
    },
})
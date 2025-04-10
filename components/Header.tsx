import { View, Text, StyleSheet } from "react-native"

interface HeaderProps {
    title: string
}

export const Header = ({ title }: HeaderProps) => {
    return(
        <View style={styles.headerContainer}>
            <Text style={styles.titleText}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 20,
        padding: 16,
    },
    titleText: {
        fontSize: 22,
        fontWeight: 700,
    },
})
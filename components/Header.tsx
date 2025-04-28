import { View, Text, StyleSheet, Pressable } from "react-native"
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

interface HeaderProps {
  title: string
  backIcon: boolean
  settingsIcon?: boolean
}

export const Header = ({ title, backIcon, settingsIcon }: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      {
        backIcon ? <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="black" />
        </Pressable> : ""
      }
      <Text style={styles.titleText}>{title}</Text>
      {
        settingsIcon ?
          <Pressable onPress={() => { router.push('../settings/') }} style={{ marginLeft: "auto" }}>
            <AntDesign name="setting" size={30} color="black" />
          </Pressable>
          : ""
      }
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20,
    padding: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 700,
  },
})
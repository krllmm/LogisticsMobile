import { Tabs } from "expo-router";
import React from "react";
import { FontAwesome, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <>
      <Tabs screenOptions={{ headerTitleAlign: "center", headerShown: false}}>
        <Tabs.Screen 
          name="delivery" 
          options={{
            tabBarLabel: "Перевозки",
            tabBarIcon: () => (<MaterialCommunityIcons name="truck-delivery" size={24} color="black" />),
          }}/>
        <Tabs.Screen 
          name="chat" 
          options={{
            tabBarLabel: "Чат",
            tabBarIcon: () => (<Entypo name="chat" size={24} color="black" />),
          }}/>
        <Tabs.Screen 
          name="profile" 
          options={{
            tabBarLabel: "Профиль",
            tabBarIcon: () => (<FontAwesome name="user" size={24} color="black" />),
          }}/>
      </Tabs>
    </>
  )
}

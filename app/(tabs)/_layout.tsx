import { Tabs } from "expo-router";
import React from "react";
import { FontAwesome } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    <>
      <Tabs>
        <Tabs.Screen 
          name="delivery" 
          options={{
            title: 'Home',
            tabBarIcon: () => (<FontAwesome name="address-book" size={24} color="black" />),
          }}/>
        <Tabs.Screen name="chat" />
        <Tabs.Screen name="profile" />
      </Tabs>
    </>
  )
}

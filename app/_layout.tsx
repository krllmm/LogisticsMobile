import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          title: "Авторизация",
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: '#ced1cd',
          },
          headerShadowVisible: false,
          headerTintColor: '#363636',
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}>
         <Stack.Screen name="(auth)/index" />
         <Stack.Screen name="(tabs)" options={{headerShown: false}} />
         <Stack.Screen name="products/[id]" options={{headerShown: true, title: "Товар"}} />
      </Stack>
      <StatusBar style="dark" />
    </>
  )
}

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

export default function RootLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          title: "Авторизация",
          headerStyle: {
            backgroundColor: '#ced1cd',
          },
          headerShadowVisible: false,
          headerTintColor: '#363636',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
         <Stack.Screen name="index" />
         <Stack.Screen name="(tabs)" options={{headerShown: false}} />
      </Stack>
      <StatusBar style="dark" />
    </>
  )
}

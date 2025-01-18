import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "react-native";
import React from "react";

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  return (
    <>
      <StatusBar backgroundColor="#f5f5f5" barStyle="dark-content" />
      <Stack 
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  )
}
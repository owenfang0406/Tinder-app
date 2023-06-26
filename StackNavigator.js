import { View, Text, StyleSheet } from "react-native"
import React, { useState } from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./screens/HomeScreen"
import ChatScreen from "./screens/ChatScreen"
import LoginScreen from "./screens/LoginScreen"
import useAuth from "./hooks/useAuth"
import * as AuthSession from "expo-auth-session"
import ProgressBar from "./Components/progressBar"

const Stack = createNativeStackNavigator()
const StackNavigator = () => {
  const { user } = useAuth()
  console.log("Stack", user)
  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={HomeScreen}
          ></Stack.Screen>
          <Stack.Screen name="Chat" component={ChatScreen}></Stack.Screen>
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
      )}
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
  },
})

export default StackNavigator

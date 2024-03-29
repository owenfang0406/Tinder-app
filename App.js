import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View, Button } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import StackNavigator from "./StackNavigator"
import { AuthProvider } from "./hooks/useAuth"

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator></StackNavigator>
      </AuthProvider>
    </NavigationContainer>
  )
}

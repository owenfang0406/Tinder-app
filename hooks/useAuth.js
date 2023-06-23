import { View, Text } from "react-native"
import React, { createContext, useContext, useMemo, useState } from "react"
import * as Google from "expo-auth-session/providers/google"

export const AuthContext = createContext({})
const config = {
  androidClientId: process.env.androidClientId,
  iosClientId: process.env.iosClientId,
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const updateUserInfo = (userInfo) => {
    console.log("useAuth", userInfo)
    setUser(() => userInfo)
  }
  const logOut = () => {
    setUser(null)
    console.log("logged out")
  }

  const memoValue = useMemo(
    () => ({
      user,
      updateUserInfo,
      logOut,
      loading,
    }),
    [user, loading]
  )
  return (
    <AuthContext.Provider value={memoValue}>{children}</AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}

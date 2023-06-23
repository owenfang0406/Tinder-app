import {
  View,
  Text,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native"
import React, { useContext, useEffect, useLayoutEffect, useState } from "react"
import * as Google from "expo-auth-session/providers/google"
import * as WebBrowser from "expo-web-browser"
import AsyncStorage from "@react-native-async-storage/async-storage"
import useAuth from "../hooks/useAuth"
import { useNavigation } from "@react-navigation/native"

//web 869873477970-sje4a1tum0iquk80l3ubnjlnde99sf0u.apps.googleusercontent.com
//ios 869873477970-vkj51td1kvbv1b4m6pcsmm4jbeg1fp79.apps.googleusercontent.com
//android 869873477970-gthvv1kcv6drtbgtbeb407uan4kj19oa.apps.googleusercontent.com
//"869873477970-l1ktvis0pblnbslv5v8iggeeug2vaf14.apps.googleusercontent.com"
WebBrowser.maybeCompleteAuthSession()

const LoginScreen = () => {
  const { updateUserInfo } = useAuth()
  const [userInfo, setUserInfo] = useState(null)
  const navigation = useNavigation()
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "869873477970-gthvv1kcv6drtbgtbeb407uan4kj19oa.apps.googleusercontent.com",
    iosClientId:
      "869873477970-vkj51td1kvbv1b4m6pcsmm4jbeg1fp79.apps.googleusercontent.com",
    webClientId:
      "869873477970-sje4a1tum0iquk80l3ubnjlnde99sf0u.apps.googleusercontent.com",
    expoClientId:
      "869873477970-j7ee87vhi9k2b23fg112pgnk4jc8v399.apps.googleusercontent.com",
  })
  async function handleSignInWithGoogle() {
    // const user = await AsyncStorage.getItem("@user")
    // console.log(response)
    if (response?.type === "success") {
      await getUserInfo(response.authentication.accessToken)
    }
    return
  }
  const getUserInfo = async (token) => {
    if (!token) return
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      const user = await response.json()
      // await AsyncStorage.setItem("@user", JSON.stringify(user))
      updateUserInfo(user)
      setUserInfo(user)
    } catch (error) {}
  }
  useEffect(() => {
    handleSignInWithGoogle()
  }, [response])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])
  return (
    <View className="flex-1">
      <ImageBackground
        resizeMode="cover"
        className="flex-1"
        source={{ uri: "https://tinder.com/static/tinder.png" }}
      >
        <TouchableOpacity
          className="absolute bottom-40 w-52 bg-white p-4 rounded-2xl"
          style={{
            marginHorizontal: "25%",
          }}
          onPress={() => promptAsync()}
        >
          <Text className="text-center font-semibold">Sign In & get Swing</Text>
        </TouchableOpacity>
      </ImageBackground>
      {/* <Text>LoginScreen</Text>
      <Button title="Login" onPress={() => promptAsync()}></Button> */}
    </View>
  )
}

export default LoginScreen

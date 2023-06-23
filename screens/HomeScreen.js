import {
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import React, { useEffect, useLayoutEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import useAuth from "../hooks/useAuth"
import { SafeAreaView } from "react-native-safe-area-context"
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons"
import Swiper from "react-native-deck-swiper"

const dummyData = [
  {
    firstName: "John",
    lastName: "Doe",
    occupation: "Engineer",
    photoURL: "https://picsum.photos/200/300?random=1",
    age: 30,
    id: 123,
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    occupation: "Teacher",
    photoURL: "https://picsum.photos/200/300?random=2",
    age: 35,
    id: 456,
  },
  {
    firstName: "Alice",
    lastName: "Johnson",
    occupation: "Doctor",
    photoURL: "https://picsum.photos/200/300?random=3",
    age: 45,
    id: 789,
  },
  {
    firstName: "Bob",
    lastName: "Williams",
    occupation: "Designer",
    photoURL: "https://picsum.photos/200/300?random=4",
    age: 28,
    id: 298,
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    occupation: "Writer",
    photoURL: "https://picsum.photos/200/300?random=5",
    age: 32,
    id: 831,
  },
]

const HomeScreen = () => {
  const navigation = useNavigation()
  const { logOut, user } = useAuth()
  useLayoutEffect(() => {}, [])

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row relative items-center justify-between px-5">
        <TouchableOpacity onPress={() => logOut()}>
          <Image
            className="w-10 h-10 rounded-full"
            source={{ uri: user?.picture }}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            className="h-14 w-14 rounded-full"
            source={require("../tinder-icon.png")}
          ></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Ionicons
            name="chatbubbles-sharp"
            size={30}
            color="#FF5864"
          ></Ionicons>
        </TouchableOpacity>
      </View>
      <View className="flex-1 -mt-6">
        <Swiper
          containerStyle={{ backgroundColor: "transparent" }}
          cards={dummyData}
          onSwipedRight={() => {
            console.log("Match")
          }}
          onSwipedLeft={() => {
            console.log("passed")
          }}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          verticalSwipe={false}
          renderCard={(card) => (
            <View
              key={card.id}
              className="relative bg-red-500 h-3/4 rounded-xl"
            >
              <Image
                className="absolute top-0 h-full w-full rounded-xl"
                source={{ uri: card?.photoURL }}
              ></Image>
              <View
                styles={styles.cardShadow}
                className="absolute bottom-0 bg-white w-full h-20 flex-row justify-between items-between px-6 py-2 rounded-b-xl"
              >
                <View>
                  <Text className="text-xl font-bold">
                    {card?.firstName} {card?.lastName}
                  </Text>
                  <Text>{card?.occupation}</Text>
                </View>
                <Text className="text-2xl font-bold">{card?.age}</Text>
              </View>
            </View>
          )}
        ></Swiper>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
})

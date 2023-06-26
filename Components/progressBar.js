import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Animated } from "react-native"

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
  },
  bar: {
    height: "100%",
  },
})

const ProgressBar = ({ progress, width, height, color }) => {
  const [barWidth, setBarWidth] = useState(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(barWidth, {
      toValue: progress,
      duration: 5000, // Change the duration as per your requirement
      useNativeDriver: false,
    }).start()
  }, [progress])

  return (
    <View style={[styles.container, { width, height }]}>
      <Animated.View
        style={[styles.bar, { width: barWidth, backgroundColor: color }]}
      />
    </View>
  )
}

export default ProgressBar

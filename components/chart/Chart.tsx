import { _Container, _padContainer, _padL, _widthContainer, _widthContainerWithPad, _ContainerWithTitle, getDataFromStorage } from "../ultis";
import { Emotions, EmotionsStorage } from "../home/EmotionData";
import { useEffect, useState } from "react";
import { PieChart, PieChartData} from "./utils";
import { StyleSheet } from "react-native";
import { useSharedState } from "@/hooks/Ultis";
import { useFocusEffect } from "expo-router";
import React from "react";

const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0.5,
  backgroundColor: "white",
  color: (opacity = 1) => `rgba(0, 0, 146, ${opacity})`,
  strokeWidth: 5, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional,
  propsForLabels: {
    fontSize: 18, // 👈 Adjust font size here
    fontWeight: "bold"
  },
  decimalPlaces: 0,
  fromZero: true
};

export default function Chart() {
  const [ data, setData ] = useState([0, 0, 0, 0, 0])
  const getEmotions = async () => {
    var result = [0, 0, 0, 0, 0]
    var emotions: EmotionsStorage[]
    emotions = (await getDataFromStorage<EmotionsStorage[]>('emotions'))!
    if (emotions) {
      emotions.map((emotion, index) => {
        result[emotion.index] += 1
      })
    }
    setData(result)
  }
  
  useFocusEffect(() => {
    getEmotions()
  })

  const widthSvg = _widthContainerWithPad
  const heightSvg = 230
  const center = [ widthSvg / 2, heightSvg / 2 ]
  const centerX = center[0]
  const centerY = center[1]
  const radius = 100
  const widthCircle =  center[0] + radius
  const heightCircle = center[1] + radius
  const pieChartData: PieChartData[] = Emotions.map((emotion, index) => {
    return ({ value: data[index], color: emotion.color, label: emotion.name })
  })

  return (
    <_ContainerWithTitle style={ styles.container } title="Thông số">
      <PieChart
        widthSvg={_widthContainerWithPad}
        heightSvg={heightSvg}
        centerX={centerX}
        centerY={centerY}
        radius={radius}
        data={pieChartData}
      />
    </_ContainerWithTitle>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginBottom: 20
  }
})
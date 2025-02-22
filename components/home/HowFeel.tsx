import { Pressable, StyleSheet, View } from "react-native"
import { _Text, _Container, _Image, _widthContainer, getDataFromStorage } from "../ultis"
import { useEffect, useState } from "react"
import { useSharedState } from "@/hooks/Ultis"
import { Emotions, EmotionsStorage } from "./EmotionData"
import AsyncStorage from '@react-native-async-storage/async-storage';

const emotions = [
  { img: require("@/assets/images/howfeel/sad.png") },
  { img: require("@/assets/images/howfeel/confused.png") },
  { img: require("@/assets/images/howfeel/happy-face.png") },
  { img: require("@/assets/images/howfeel/angry.png") },
  { img: require("@/assets/images/howfeel/smile.png") }
]

const emotionSize = 40

function isSameDay(timestamp1: number, timestamp2: number) {
  const date1 = new Date(timestamp1);
  const date2 = new Date(timestamp2);

  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

export default function HowFeel() {
  const { state, setState } = useSharedState()

  useEffect(() => {
    (async () => {
      const data = await getDataFromStorage<EmotionsStorage[]>('emotions')
      if (data)  
        if (isSameDay(data.at(-1)?.time!, Date.now())) {
          setState(data.at(-1)?.index!)
        } 
    })()
  }, [])

  return (
    <_Container style={ styles.container }>
      <_Text>Bạn cảm thấy như thế nào hôm nay?</_Text>
      <View style={ styles.emotionView }>
        { emotions.map((emotion, index) => (
          <Pressable key={ index } onPress={async () => {
            // Save data
            try {
              const emotions = await AsyncStorage.getItem('emotions')
              var data: EmotionsStorage[] = []
            
              if (emotions) {
                data = JSON.parse(emotions!)
                if (isSameDay(data.at(-1)?.time!, Date.now())) {
                  data[data.length - 1].time = Date.now()
                  data[data.length - 1].index = index
                } else
                  data.push({ time: Date.now(), index })
              } else {
                data.push({ time: Date.now(), index })
              }
              
              await AsyncStorage.setItem('emotions', JSON.stringify(data))
              setState(index)

              console.log('Store data successfully!')

            } catch (err) {
              console.error(err)
            }
          }}>
            <_Image 
              resizeMode="cover"
              source={ emotion.img } 
              style={[ styles.emotionIcon, 
                (index != state) && (state != -1) ? styles.emotionIconInactive : "" 
              ]}
            />
          </Pressable>
        )) }
      </View>
    </_Container>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  emotionView: {
    marginTop: 10,
    flexDirection: 'row',
    width: _widthContainer,
    justifyContent: 'space-evenly'
  },
  emotionIcon: {
    width: emotionSize,
    height: emotionSize,
  },
  emotionIconInactive: {
    opacity: 0.5
  }
})
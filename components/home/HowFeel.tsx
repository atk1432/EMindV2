import { Pressable, StyleSheet, View } from "react-native"
import { _Text, _Container, _Image, _widthContainer } from "../ultis"
import { useState } from "react"
import { useSharedState } from "@/hooks/Ultis"

const emotions = [
  { img: require("@/assets/images/howfeel/sad.png") },
  { img: require("@/assets/images/howfeel/confused.png") },
  { img: require("@/assets/images/howfeel/happy-face.png") },
  { img: require("@/assets/images/howfeel/angry.png") },
  { img: require("@/assets/images/howfeel/smile.png") }
]

const emotionSize = 40

export default function HowFeel() {
  const { state, setState } = useSharedState()

  return (
    <_Container style={ styles.container }>
      <_Text>Bạn cảm thấy như thế nào hôm nay?</_Text>
      <View style={ styles.emotionView }>
        { emotions.map((emotion, index) => (
          <Pressable key={ index } onPress={() => setState(index)} >
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
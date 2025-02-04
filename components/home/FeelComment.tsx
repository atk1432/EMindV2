import { StyleSheet, View } from "react-native";
import { _Container, _Text, _Image } from "../ultis";
import { useSharedState } from "@/hooks/Ultis";
import { Emotions } from "./EmotionData";
import Animated, { FadeIn, useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";
import React, { useEffect } from "react";

const thinkImg = require("@/assets/images/howfeel/emotion_reaction.jpg")

export default function FeelComment() {
  const { state, setState } = useSharedState()
  const opacity = useSharedValue(0); // Start with opacity 0 (invisible)

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 }); // Fade in over 1 second
    // return () => {
    //     opacity.value = 0
    // }
  }, [])


  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value
  }))

  return (
    <_Container style={ styles.container }>
      <View style={ styles.text }>
        <_Text style={ styles.text }>Bạn đang cảm thấy như thế nào?</_Text>
        { state === -1 ?  <></> : 
          <_Text style={[ styles.text, styles.emotionText, { color: Emotions[state].color } ]}>
            { Emotions[state].name }
          </_Text>
        }
      </View>
      { state === -1 ?
        <Animated.Image source={ thinkImg } style={[ styles.image, animatedStyle ]} resizeMode="cover" /> :
        <Animated.Image
          entering={ FadeIn }
          source={ Emotions[state].img } 
          style={[ styles.image ]} 
          resizeMode="cover" 
        />
      } 
    </_Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:  'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewText: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  text: {
    flex: 0.7,
    textAlign: 'center',
  },
  emotionText: {
    // fontWeight: 700
  },
  image: {
    marginLeft: 20,
    width: 80,
    height: 80
  },

})
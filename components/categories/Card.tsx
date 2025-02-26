import { StyleSheet, ViewProps, View, Pressable } from "react-native";
import { _Container, _Text, _Image, getDataFromStorage } from "../ultis";
import { Container } from "@shopify/react-native-skia/lib/typescript/src/renderer/Container";
import { Link, router, useFocusEffect } from "expo-router";
import { useEffect, useState } from "react";
import { CardNames, ScoresStorage } from "./CardDatas";

interface _Card extends ViewProps {
  name: CardNames,
  title?: string,
  describe?: string,
  image?: any
}

export default function Card(props: _Card) {

  const [ score, setScore ] = useState<number>(0) 

  const getScoreFromStorage = async () => {
    const scores: ScoresStorage[] = (await getDataFromStorage('scores'))!
    if (scores) {
      scores.map((score) => {
        if (props.name === score.name) {
          setScore(score.score)
          console.log(score.score)
        }
      })
    } 
  }

  useFocusEffect(() => {
    getScoreFromStorage()
  })

  return (
    <Pressable onPress={() => {
      router.navigate({ pathname: "/categories/contents/[slug]", params: { slug: props.name } })
    }}>
      <_Container style={ styles.container }>
        <_Image 
          source={ props.image } 
          resizeMode="cover" 
          style={ styles.image }
        />
        <View style={ styles.view2 }>
          <_Text style={ styles.text }>{ props.title }</_Text>
          {/* <_Text style={[ styles.text, styles.textDescribe ]}>{ props.describe }</_Text> */}
        </View>
        <View>
          <_Text style={[ styles.text, styles.score ]}>{ score }</_Text>
        </View>
      </_Container>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: "#e7eaee",
  },
  text: {
    color: '#112a46',
  },
  view2: {
    flex: 0.9
  },
  textDescribe: {
    fontSize: 12,
    opacity: 0.6
  },
  score: {
    marginRight: 10,
    fontSize: 26
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10
  }
})
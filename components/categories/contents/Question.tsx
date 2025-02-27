import { _Container, _Text, _Image, _widthContainer, _padL, _padT, _Layout, _heightStack, _padContainer, _fontFamilyBold, _widthContainerWithPad, getDataFromStorage } from "@/components/ultis";
import { StyleSheet, ViewProps, View, Dimensions, Pressable, ScrollView } from "react-native";
import { CardNames, Cards, ContentQuestionProps, ScoresStorage } from "@/components/categories/CardDatas"
import ButtonNormal from "@/components/buttons/ButtonNormal";
import React, { memo, useEffect, useRef } from "react";
import { useState } from "react";
import { useSharedState, useSharedStateTabBar } from "@/hooks/Ultis";
import { Button } from "react-native-paper";
import { getResultFromScores, setScoreForQuestion } from "./questionModules";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


interface QuestionProps extends ViewProps {
  content: ContentQuestionProps
}

interface AnswerProps extends ViewProps {
  answers: string[],
  questionIndex: number,
  name: CardNames,
  refAnswers: React.MutableRefObject<{}>
}


const Answer = memo((props: AnswerProps) => {
  const [ focus, setFocus ] = useState<number | undefined>()

  return (
    <View style={ styles.answerView }>
      { props.answers.map((answer, index) => (
        <Pressable key={index} onPress={() => {
          setScoreForQuestion(props.refAnswers, props.questionIndex, index, props.name)
          setFocus(index)
        }}>
          <_Text style={[ 
            styles.buttonAnswer, 
            focus === index ? { backgroundColor: "#dddddd" } : {}
          ]}>{ answer }</_Text>
        </Pressable>
      )) }
    </View>
  )
})

/**
 * - This is component which render questions. 
 * - Its include begin, middle and end.
 */
export default function Question(props: QuestionProps) {

  // content variable is using for access card like name, questions, answers, image, describe,...
  const content = props.content    


  const [ start, setStart ] = useState(false)
  const [ showResult, setShowResult ] = useState(false)
  const { state, setState } = useSharedStateTabBar()
  const answers = useRef({})
  const score = useRef(0)

  useEffect(() => {
    setState(1)
    return () => {
      setState(0)
    }
  }, [])

  if (!start)   // Render start question screen
    if (!showResult)
      return (
        <_Layout>
          <_Container style={ styles.container }>
            <_Text style={ styles.titleStart }>{ content.name }</_Text>
            <_Image source={ content.image } style={ styles.image } />
            <_Text style={ styles.describeText }>{ content.describe }</_Text>
            <ButtonNormal 
              title="Bắt đầu" 
              style={ styles.buttonStart }
              onPress={() => {
                setStart(true); 
              }} 
            />
          </_Container>    
        </_Layout>
      )
    else {
      const score = getResultFromScores(answers, content.name)!;
      (async () => {
        // Get scores from AsyncStorage
        const scores = await getDataFromStorage<ScoresStorage[]>("scores")

        if (!scores) {
          const data: ScoresStorage[] = [
            { name: content.name, score: score.score! }
          ] 
          await AsyncStorage.setItem("scores", JSON.stringify(data))
          console.log("Scores is stored successfully!!!")
        } else {
          scores.map(async (s, i) => {
            if (s.name === content.name) {
              scores[i].score = score.score!
              await AsyncStorage.setItem("scores", JSON.stringify(scores))
              return
            }
          })
          console.log("Scores is modified successfully!!!")
        }
      })()


      return (       // Render result screen
      <_Layout>
        <_Container style={ styles.container }>
          <_Text style={[ styles.scoreText, { color: score.level?.color } ]}>
            { score.score }
          </_Text>
          <_Text style={[ styles.levelText, { color: score.level?.color }  ]}>
            { score.level?.name }
          </_Text>
          <ButtonNormal 
            style={ styles.resultButton }
            title="Trở lại" 
            onPress={() => router.back() } 
          />
        </_Container>
      </_Layout>
    )}
  else return (    // Render questions
    <_Layout>
      <_Container style={ styles.container }>
        <ScrollView>
          { content.questions.map((question, index) => 
            <View key={index}>
              <_Text style={ styles.questionText }>{ index + 1 }. { question }</_Text>
              <Answer 
                answers={ content.answers } 
                refAnswers={ answers } 
                questionIndex={index} 
                name={ content.name }
              />
            </View>
          )}
        </ScrollView>
        <ButtonNormal 
          style={ styles.buttonShowResult } title="Kết quả" 
          onPress={() => {
            setStart(false)
            setShowResult(true)
          }}
        />
      </_Container>
    </_Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - _heightStack - 50,
  },
  image: {
    width: _widthContainerWithPad,
    height: 200,
    alignSelf: 'center',
    borderRadius: 10,
  },
  questionView: {
    paddingTop: _padT,
    paddingLeft: _padL,
    paddingRight: _padL,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 2,
    elevation: 1,
  },
  describeText: {
    // fontSize: 20,
    marginTop: 20,
    marginBottom: 20
  },
  titleStart: {
    fontFamily: _fontFamilyBold,
    fontSize: 26,
    marginBottom: 20,
    textAlign: 'center'
  },
  buttonStart: {
    width: 200,
    alignSelf: 'center'
  },
  questionText: {

  },
  answerView: {
    marginBottom: 10
  },
  buttonAnswer: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    fontSize: 15
  },
  buttonShowResult: {
    marginTop: 10
  },
  scoreText: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: _fontFamilyBold
  },
  levelText: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: _fontFamilyBold
  },
  resultButton: {
    marginTop: 20,
    width: 150,
    alignSelf: 'center'
  }
})
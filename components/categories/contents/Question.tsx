import { _Container, _Text, _Image, _widthContainer, _padL, _padT, _Layout, _heightStack, _padContainer } from "@/components/ultis";
import { StyleSheet, ViewProps, View, Dimensions, Pressable, ScrollView } from "react-native";
import { CardNames, Cards, ContentQuestionProps } from "@/components/categories/CardDatas"
import ButtonNormal from "@/components/buttons/ButtonNormal";
import React, { memo, useEffect, useRef } from "react";
import { useState } from "react";
import { useSharedState, useSharedStateTabBar } from "@/hooks/Ultis";
import { Button } from "react-native-paper";
import { getResultFromScores, setScoreForQuestion } from "./questionModules";


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

export default function Question(props: QuestionProps) {
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
            <_Image source={ content.image } style={ styles.image } />
            <_Text>{ content.describe }</_Text>
            <ButtonNormal 
              title="Bắt đầu" 
              onPress={() => {
                setStart(true); 
              }} 
            />
          </_Container>    
        </_Layout>
      )
    else return (       // Render result screen
      <_Layout>
        <_Container style={ styles.container }>
          <_Text>{ getResultFromScores(answers, content.name) }</_Text>
        </_Container>
      </_Layout>
    )
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
    width: _widthContainer - 2*_padContainer,
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
  }
})
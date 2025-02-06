import { _Container, _Text, _Image, _widthContainer, _padL, _padT, _Layout, _heightStack } from "@/components/ultis";
import { StyleSheet, ViewProps, View, Dimensions, Pressable, ScrollView } from "react-native";
import { Cards, ContentQuestionProps } from "@/components/categories/CardDatas"
import ButtonNormal from "@/components/buttons/ButtonNormal";
import React, { memo, useEffect } from "react";
import { useState } from "react";
import { useSharedState, useSharedStateTabBar } from "@/hooks/Ultis";


interface QuestionProps extends ViewProps {
  content: ContentQuestionProps
}

interface AnswerProps extends ViewProps {
  answers: string[]
}

const Answer = memo((props: AnswerProps) => {
  const [ focus, setFocus ] = useState<number | undefined>()

  return (
    <View style={ styles.answerView }>
      { props.answers.map((answer, index) => (
        <Pressable key={index} onPress={() => setFocus(index)}>
          <_Text style={[ 
            styles.buttonAnswer, 
            focus === index ? { backgroundColor: "gray" } : {}
          ]}>{ answer }</_Text>
        </Pressable>
      )) }
    </View>
  )
})

export default function Question(props: QuestionProps) {
  const content = props.content
  const [ start, setStart ] = useState(false)
  const [ questionIndex, setQuestionIndex ] = useState(0)
  const { state, setState } = useSharedStateTabBar()

  useEffect(() => {
    setState(1)
    return () => {
      setState(0)
    }
  }, [])

  if (!start)
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
  else return (
    <_Layout>
      <_Container style={ styles.container }>
        <ScrollView>
          { content.questions.map((question, index) => 
            <View key={index}>
              <_Text style={ styles.questionText }>{ index + 1 }. { question }</_Text>
              <Answer answers={ content.answers } />
            </View>
          )}
        </ScrollView>
      </_Container>
    </_Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginTop: -_padT
    height: Dimensions.get('window').height - _heightStack - 50
  },
  image: {
    width: _widthContainer,
    borderRadius: 10
  },
  questionView: {
    paddingTop: _padT,
    paddingLeft: _padL,
    paddingRight: _padL,
    // position: 'absolute',
    top: 0,
    left: 0,
    // borderWidth: 2,
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
  }
})
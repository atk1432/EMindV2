import { _Container, _Text, _Image, _widthContainer, _padL, _padT, _Layout } from "@/components/ultis";
import { StyleSheet, ViewProps, View, Dimensions } from "react-native";
import { Cards, ContentQuestionProps } from "@/components/categories/CardDatas"
import ButtonNormal from "@/components/buttons/ButtonNormal";
import React from "react";
import { useState } from "react";

interface QuestionProps extends ViewProps {
  content: ContentQuestionProps
}

export default function Question(props: QuestionProps) {
  const content = props.content
  const [ start, setStart ] = useState(false)

  if (!start)
    return (
      <_Layout>
        <_Container style={ styles.container }>
          <_Image source={ content.image } style={ styles.image } />
          <_Text>{ content.describe }</_Text>
          <ButtonNormal title="Bắt đầu" onPress={() => setStart(true)} />
        </_Container>    
      </_Layout>
    )
  else return (
    <View style={ styles.questionView }>
      <_Text>Hello</_Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: -_padL,
    paddingTop: -_padT
  },
  image: {
    width: _widthContainer,
    borderRadius: 10
  },
  questionView: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderWidth: 2,
    height: Dimensions.get('window').height - 50,
    zIndex: 2,
    elevation: 1,
  }
})
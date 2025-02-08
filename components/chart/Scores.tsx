import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { _ContainerWithTitle, _Text, _widthContainerWithPad } from "../ultis";
import { StyleSheet, View, ScrollView } from "react-native";

interface ScoreProps extends ViewProps {
  name: string,
  score: number
}


const Score = (props: ScoreProps) => {
  return (
    <View style={ styles.scoreView }>
      <_Text style={[ styles.scoreText, styles.name ]}>{ props.name }</_Text>
      <_Text style={[ styles.scoreText, styles.score ]}>{ props.score }</_Text>
    </View> 
  )
}


export default function Scores() {
  const scores = [
    { name: "PSS-10", score: 10 },
    { name: "PSS-10", score: 10 },
    { name: "PSS-10", score: 10 },
    { name: "PSS-10", score: 10 },
    { name: "PSS-10", score: 10 }
  ]

  return (
    <_ContainerWithTitle style={ styles.container } title="Điểm">
      <ScrollView 
        style={ styles.scrollView } 
        horizontal 
        showsHorizontalScrollIndicator={ false } 
        overScrollMode="never"
      >
        { scores.map((score, index) => (
          <Score key={index} name={ score.name } score={ score.score } />
        )) }
      </ScrollView>
    </_ContainerWithTitle> 
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // height: 300,
  },
  scrollView: {
    width: _widthContainerWithPad,
    // height: 300,
    // flexDirection: 'row'
  },
  scoreView: {
    width: 100,
    height: 130,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#669900',
    marginLeft: 5,
    marginRight: 5
  },
  scoreText: {
    textAlign: 'center',
    color: 'white'
  },
  name: {
    position: 'absolute',
    top: 5
  },
  score: {
    fontSize: 25,
    fontFamily: 'Lexend-Bold'
  }
})
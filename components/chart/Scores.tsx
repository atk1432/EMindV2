import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { _ContainerWithTitle, _Text, _widthContainerWithPad } from "../ultis";
import { StyleSheet, View, ScrollView } from "react-native";

interface ScoreProps extends ViewProps {
  name: string,
  score: number
}

const getRandom = <T,>(arr: T[]) => (arr[Math.floor(Math.random() * arr.length)]);

const Score = (props: ScoreProps) => {
  const color = getRandom(
    ['#od3d56', '#1287a8', '#829356', '#bca136', '#c2571a', '#ad2a1a',
      '#3c6478', '#43abc9', '#a3b86c', '#c02f1d', '#d3b53d', '#ebc944'
    ])
  return (
    <View style={[ styles.scoreView, { backgroundColor: color } ]}>
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
    marginBottom: 30
  },
  scrollView: {
    width: _widthContainerWithPad,
  },
  scoreView: {
    width: 100,
    height: 130,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f6f8f9',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scoreText: {
    textAlign: 'center',
    color: 'white',
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
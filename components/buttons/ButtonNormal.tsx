import { StyleSheet, TouchableOpacity } from "react-native";
import { _Text } from "../ultis";
import { _Button } from "./_button";
import { _mainColor } from "../ultis";

export default function ButtonNormal(props: _Button) {
  return (
    <TouchableOpacity
      onPress={ props.onPress }
      style={[ styles.button, props.style ]}
    >
      <_Text style={ styles.text }>
        { props.title }
      </_Text> 
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: _mainColor,
    padding: 10,
    borderRadius: 20
  },
  text: {
    textAlign: 'center'
  }
})
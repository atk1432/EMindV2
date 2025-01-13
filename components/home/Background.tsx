import { Dimensions, StyleSheet } from "react-native";
import { _Layout, _padL, _Text, _Image } from "../ultis";

export default function Background() {
  return (
    <_Image 
      resizeMode="cover"
      style={ styles.bg }
      source={ require("@/assets/images/home/bg3.jpg") }
    />
  )
}

const styles = StyleSheet.create({
  bg: {
    width: Dimensions.get('window').width - 2 * _padL,
    height: 150,
    borderRadius: 10
  }
})
import { StyleSheet } from "react-native";
import { _Container, _Text } from "../ultis";
import { useSharedState } from "@/hooks/Ultis";

export default function FeelComment() {
  const { state, setState } = useSharedState()

  return (
    <_Container style={ styles.container }>
      <_Text style={ styles.text }>Bạn đang như thế nào vậy? { state }</_Text>
    </_Container>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#01ff70"
  },
  text: {
    textAlign: 'center',
    // color: '#85144b'
  }
})
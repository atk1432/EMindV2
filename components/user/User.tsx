import { StyleSheet, View } from "react-native"
import { _Container, _Image, _Text } from "../ultis"

export default function User() {
  return (
    <_Container style={ styles.container }>
      <_Image 
        style={ styles.avatar }
        source={require("@/assets/images/user/avatar.jpg")} 
      />
      <View style={ styles.describeText }>
        <_Text>Your name</_Text>
        <_Text>Age: 21</_Text>
      </View>
    </_Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between'
  },  
  describeText: {
    marginLeft: 20
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100
  }
})
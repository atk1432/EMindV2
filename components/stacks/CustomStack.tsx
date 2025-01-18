import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { _colorBg, _Text } from "../ultis"
import { _padL, _padT } from "../ultis";
import { useNavigation } from "expo-router";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";

export default function CustomStack(props: any) {
  const navigation = props.navigation 
  const route = props.route 
  const options = props.options

  return (
    <View style={ styles.header }>
      <TouchableOpacity 
        style={ styles.button }
        onPress={() => { if (navigation.canGoBack()) navigation.goBack() }}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>
      <_Text style={ styles.headerText }>
        { options.tabBarLabel }
      </_Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: _padT,
    paddingLeft: _padL,
    backgroundColor: _colorBg
    // position: 'absolute',
  },
  headerText: {
    fontSize: 24,
    marginLeft: 10
  },
  button: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
  }
})
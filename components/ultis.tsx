import { ReactNode, useEffect } from "react";
import { StyleSheet, Text, TextStyle, ViewStyle } from "react-native";
import { useFonts } from 'expo-font'
import { Link, SplashScreen } from "expo-router";

interface Node {
  children?: ReactNode
}

interface TextNode extends Node {
  style?: TextStyle
}

interface ViewNode extends Node {
  style?: ViewStyle
}

interface LinkNode extends TextNode {
  href?: any
}

// Global
export const _padL = 23
export const _padT = 20
export const _fontFamily = 'SourGummy-Regular'
const fontFamilyModule = require(`@/assets/fonts/SourGummy-Regular.ttf`)

export function _Text(node: TextNode) {
  const [ loaded, error ] = useFonts({
    [_fontFamily]: fontFamilyModule
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    console.log("Error fonts")
    return null;
  }

  return (
    <Text style={[ styles.text, node.style ]}>
      { node.children }
    </Text>
  )
}

export function _Link(node: LinkNode) {
  return (
    <Link 
      href={ node.href }
      style={[ node.style, styles.text ]}
    >
      { node.children }
    </Link>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: _fontFamily
  }
})
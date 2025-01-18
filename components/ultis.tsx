import { ReactNode, useEffect } from "react";
import { StyleSheet, Text, TextStyle, Image, ViewStyle, ImageProps, TextProps, ViewProps, View, ScrollView, Dimensions } from "react-native";
import { useFonts } from 'expo-font'
import { Link, LinkProps, SplashScreen } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";


// Global
export const _padL = 16
export const _padT = 18
export const _colorBg = '#f5f5f5'
export const _mainColor = '#db9c60'
export const _widthContainer = Dimensions.get('window').width - 2 * _padL
export const _fontFamily = 'Lexend-Regular'
const fontFamilyModule = require(`@/assets/fonts/Lexend-Regular.ttf`)


interface _Layout extends ViewProps {
  size?: 'full' 
}


export function _Text(node: TextProps) {
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

export function _Link(node: LinkProps) {
  return (
    <Link 
      href={ node.href }
      style={[ node.style, styles.text ]}
    >
      { node.children }
    </Link>
  )
}

export function _Image(node: ImageProps) {
  return (
    <Image 
      source={ node.source }
      style={ node.style } 
    />
  )
}

// Use to wrap all container
export function _Layout(node: _Layout) {
  // Add logic for styles
  const _styles = [ styles.layout, node.style ]
  if (node.size == 'full') _styles.push(styles.layoutFullSize)

  return (
    <SafeAreaView 
      style={ _styles }
    >
      <ScrollView showsVerticalScrollIndicator>
        { node.children }
      </ScrollView>
    </SafeAreaView>
  )
}

// Use for adjust style such as backgroundColor, borderRadius instead of View
export function _Container(node: ViewProps) {
  return (
    <View style={[ node.style, styles.container ]}>
      { node.children }
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontFamily: _fontFamily,
    fontSize: 16
  },
  layout: {
    paddingTop: _padT,
    paddingBottom: _padT,
    paddingLeft: _padL,
    paddingRight: _padL,
    backgroundColor: _colorBg
  },
  layoutFullSize: {
    height: Dimensions.get('window').height
  },
  container: {
    marginTop: 10,
    paddingTop: _padT,
    paddingBottom: _padT,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10
  }
})
import { ReactNode, useEffect, memo } from "react";
import { StyleSheet, Text, TextStyle, Image, ViewStyle, ImageProps, TextProps, ViewProps, View, ScrollView, Dimensions } from "react-native";
import { useFonts } from 'expo-font'
import { Link, LinkProps, SplashScreen } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SharedStateProvider } from "@/hooks/Ultis";
import React from "react";


// Global
export const _padL = 16
export const _padT = 18
export const _colorBg = '#f5f5f5'
export const _mainColor = '#db9c60'
export const _widthContainer = Dimensions.get('window').width - 2 * _padL
export const _fontFamily = 'Lexend-Regular'
export const _fontFamilyBold = 'Lexend-Bold'
const fontFamilyModule = require(`@/assets/fonts/Lexend-Regular.ttf`)
const fontFamilyBoldModule = require(`@/assets/fonts/Lexend-Bold.ttf`)


interface _Layout extends ViewProps {
  size?: 'full' 
}

interface _Container extends ViewProps {
  title?: string
}

interface _Text extends TextProps {
  weight?: string
}

export function _Text(node: _Text) { 
  const [ loaded, error ] = useFonts({
    [_fontFamily]: fontFamilyModule,
    [_fontFamilyBold]: fontFamilyBoldModule
  })

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    // console.log("Error fonts")
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
      { ...node } 
    />
  )
}

// Use to wrap all container
export function _Layout(node: _Layout) {
  // Add logic for styles
  // add 'Full' for size parameter to maximum background height
  const _styles = [ styles.layout, node.style ]
  if (node.size == 'full') _styles.push(styles.layoutFullSize)

  return (
    <SafeAreaView 
      style={ _styles }
    >
      <ScrollView showsVerticalScrollIndicator>
        <SharedStateProvider>
          { node.children }
        </SharedStateProvider>
      </ScrollView>
    </SafeAreaView>
  )
}

// Use for adjust style such as backgroundColor, borderRadius instead of View
export function _Container(node: ViewProps) {
  return (
    <View style={[ styles.container, node.style ]}>
      { node.children }
    </View>
  )
}

export function _ContainerWithTitle(node: _Container) {
  return (<>
    <_Text style={ styles.title }>{ node.title }</_Text>
    <View style={[ node.style, styles.container ]}>
      { node.children }
    </View>
  </>
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
  }, 
  title: {
    marginTop: 18,
    fontSize: 20
  }
})
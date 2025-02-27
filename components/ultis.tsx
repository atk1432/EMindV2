import { ReactNode, useEffect, memo } from "react";
import { StyleSheet, Text, TextStyle, Image, ViewStyle, ImageProps, TextProps, ViewProps, View, ScrollView, Dimensions } from "react-native";
import { useFonts } from 'expo-font'
import { Link, LinkProps, SplashScreen } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { SharedStateProvider } from "@/hooks/Ultis";
import AsyncStorage from "@react-native-async-storage/async-storage"
import React from "react";


// Global
export const _padL = 16   // this is for paddingLeft, paddingRight of _Layout
export const _padT = 18   // this is for paddingTop, paddingBottom of _Layout, _Container
export const _padContainer = 10 // this is paddingLeft and paddingRight of _Container
export const _colorBg = '#f5f5f5'  // color background for app
export const _mainColor = '#db9c60'   // color background for button, tab bar middle button
export const _widthContainer = Dimensions.get('window').width - 2 * _padL  // width of _Container
export const _widthContainerWithPad = _widthContainer - 2*_padContainer 
export const _heightStack = 50
export const _fontFamily = 'Lexend-Regular'  // main font
export const _fontFamilyBold = 'Lexend-Bold'  // main font but bold
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
      <ScrollView showsVerticalScrollIndicator={ false }>
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


/**
 * Get data from AsyncStorage, check data is not null then use JSON to parse it.
 * @example 
 *  const data = await getDataFromStorage('emotions')
 *  if (data) { 
 *    // code is here 
 *  }        
 * @param name Name of data
 * @param callback Callback to execute
 */
export async function getDataFromStorage<T = any>
  (name: "emotions" |  "scores", callback: any = null): Promise<T | undefined> 
{
  var data = await AsyncStorage.getItem(name)
  if (data) {
    data = JSON.parse(data)
    if (callback) callback()
    return data as T
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: _fontFamily,
    fontSize: 16
  },
  layout: {
    paddingTop: _padT,
    paddingBottom: _heightStack + 10,
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
    padding: _padContainer,
    backgroundColor: 'white',
    borderRadius: 10
  }, 
  title: {
    marginTop: 18,
    fontSize: 20
  }
})
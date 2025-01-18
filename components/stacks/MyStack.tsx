import { ScreenProps, Stack, useNavigation } from "expo-router";
import { ReactNode } from "react";
import CustomStack from '@/components/stacks/CustomStack';
import { useRoute } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { _colorBg } from "../ultis";


/**
 * Change all prop, styles, ... in CustomStack.tsx 
*/


interface _Screen {
  screen: ReactNode,
  index: number
}


// This component which used for in wrap stack screen in (tabs)
export default function MyStack(screens: any) {
  const navigation = useNavigation()

  return (
    <Stack    
      screenOptions={{
        headerShown: false,
        header: (props) => <CustomStack {...props} /> 
      }}
    >
      { screens.children }
    </Stack>
  )
}

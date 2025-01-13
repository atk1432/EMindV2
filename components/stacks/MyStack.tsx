import { ScreenProps, Stack, useNavigation } from "expo-router";
import { ReactNode } from "react";
import CustomStack from '@/components/stacks/CustomStack';
import { useRoute } from "@react-navigation/native";

interface _Screen {
  screen: ReactNode,
  index: number
}

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
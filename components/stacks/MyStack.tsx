import { ScreenProps, Stack } from "expo-router";
import { ReactNode } from "react";
import CustomStack from '@/components/stacks/CustomStack';
import { useRoute } from "@react-navigation/native";

interface _Screen {
  screen: ReactNode,
  index: number
}

export default function MyStack(screens: any) {
  const route = useRoute()

  return (
    <Stack    
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        header: (props) => <CustomStack {...props} /> 
      }}
    >
      { screens.children }
      { route.name }
    </Stack>
  )
}
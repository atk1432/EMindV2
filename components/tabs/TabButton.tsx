import { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Button, Pressable } from "react-native";

export default function TabButton(props: BottomTabBarButtonProps) {
  return (
    <Pressable 
      android_ripple={{
        color: 'yellow',
        
      }}
      {...props}
    >
      { props.children }
    </Pressable>
  )
}
import { Dimensions, StyleSheet, TouchableOpacity, View  } from "react-native";
import { _colorBg, _mainColor, _Text } from "../ultis";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";
import { useRoute, useNavigationState } from "@react-navigation/native";
import React from "react";
import { useSharedStateTabBar } from "@/hooks/Ultis";


export default function TabBar(props: BottomTabBarProps) {
  const states = props.state
  const descriptors = props.descriptors
  const navigation = props.navigation
  var propIcon : {
    focused: boolean,
    color: string,
    size: number
  } 

  // Make tabbar disappear when user is focusing in categories
  const { state, setState } = useSharedStateTabBar()
  
  return (
    <View style={[ styles.tabBarStyle, state !== 0 ? { display: 'none' } : { display: 'flex' } ]}>
      {states.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label : any = options.tabBarIcon !== undefined 
                          ? options.tabBarIcon(propIcon)
                          : <></>;

        const isFocused = states.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };


        if (index !== 2)
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[ styles.tabBarButton, isFocused ? styles.tabBarButtonFocus : "" ]}
            >              
              { label } 
            </TouchableOpacity>
          )
        else
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[ 
                styles.tabBarButton, 
                styles.tabBarButtonMiddle, 
                isFocused ? styles.tabBarButtonFocus : "" 
              ]}
            >
              { label }
            </TouchableOpacity>
          ) 
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
    paddingTop: 8,
    paddingBottom: 8,
    zIndex: 1,
    elevation: 0,
    position: 'absolute',
    width: Dimensions.get('window').width,
    bottom: 0
  },
  tabBarButton: {
    alignItems: 'center',
    width: 40,
    height: 40,
    justifyContent: 'center'
  },
  tabBarButtonMiddle: {
    position: 'relative',
    backgroundColor: _mainColor,
    borderRadius: 100,
    bottom: 20,
    transform: [{ scale: 1.8 }],
    borderWidth: 4,
    borderColor: _colorBg
  },
  tabBarButtonFocus: {
    backgroundColor: '#ececec',
    borderRadius: 50,
  },
  tabBarButtonText: {

  }
})
import { StyleSheet, TouchableOpacity, View  } from "react-native";
import { _colorBg, _mainColor, _Text } from "../ultis";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";


export default function TabBar(props: BottomTabBarProps) {
  const state = props.state
  const descriptors = props.descriptors
  const navigation = props.navigation
  var propIcon : {
    focused: boolean,
    color: string,
    size: number
  } 

  return (
    <View style={ styles.tabBarStyle }>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label : any = options.tabBarIcon !== undefined 
                          ? options.tabBarIcon(propIcon)
                          : route.name;

        const isFocused = state.index === index;

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
    paddingBottom: 8
    // height: 50
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
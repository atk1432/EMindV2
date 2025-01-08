import { StyleSheet, TouchableOpacity, View  } from "react-native";
import { _Text } from "../ultis";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Octicons } from "@expo/vector-icons";


export default function TabBar(props: BottomTabBarProps) {
  var state = props.state
  var descriptors = props.descriptors
  var navigation = props.navigation

  return (
    <View style={ styles.tabBarStyle }>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label : any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : options.tabBarIcon !== undefined 
            ? options.tabBarIcon
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

        // console.log(label)

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={ styles.tabBarButton }
          >
            { label() }
          </TouchableOpacity>
        );
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
    height: 50
  },
  tabBarButton: {
    alignItems: 'center',
  },
  tabBarButtonText: {

  }
})
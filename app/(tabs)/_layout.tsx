import { _fontFamily } from '@/components/ultis';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, Octicons } from "@expo/vector-icons"
import TabBar from '@/components/tabs/TabBar';

interface TabScreenData {
  name: string,
  icon?: any,
  title?: string
}

const iconSize = 18
const iconColor = 'black'

export default function TabLayout() {
  const tabs : TabScreenData[] = [ 
    { 
      name: '(home)', 
      icon: <AntDesign name="home" size={iconSize} color={iconColor} />,
      title: "Home"
    },
    { 
      name: 'chat', 
      icon: <Ionicons name="chatbubble-ellipses-outline" size={iconSize} color={iconColor} />,
      title: "Trò chuyện"
    },  
    { 
      name: 'chart', 
      icon: <AntDesign name="barschart" size={iconSize} color={iconColor} />,
      title: "Biểu đồ"
    },
    { 
      name: 'user', 
      icon: <AntDesign name="user" size={iconSize} color={iconColor} /> ,
      title: "Profile"
    },
  ]

  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        animation: 'shift',

      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      { tabs.map((tab, index) => (
        <Tabs.Screen
          key={ index }
          name={ tab.name } 
          options={{
            tabBarIcon: () => tab.icon,
            tabBarLabel: tab.title,
            headerTitle: tab.title
          }}
        />
      ))}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    borderRadius: 100
  },
  tabBarLabelStyle: {
    fontFamily: _fontFamily
  }
})

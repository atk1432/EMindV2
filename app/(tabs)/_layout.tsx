import { _fontFamily } from '@/components/ultis';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons, Octicons, FontAwesome5 } from "@expo/vector-icons"
import TabBar from '@/components/tabs/TabBar';
import CustomStack from '@/components/stacks/CustomStack';

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
      name: 'categories', 
      icon: <AntDesign name="book" size={iconSize} color={iconColor} />,
      title: "Gợi ý cho bạn"
    },  
    { 
      name: 'heartRate', 
      icon: <AntDesign name="plus" size={iconSize} color={iconColor} />,
      title: "Đo nhịp tim"
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
        headerShown: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        animation: 'shift',
        header: (props) => <CustomStack {...props} />
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      { tabs.map((tab, index) => {
        return (
          <Tabs.Screen
            key={ index }
            name={ tab.name } 
            options={{
              headerShown: index === 1 ? false : true,
              tabBarIcon: () => tab.icon,
              tabBarLabel: tab.title,
              headerTitle: tab.title
            }}
          />)
        }
      )}
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    borderRadius: 100,
  },
  tabBarLabelStyle: {
    fontFamily: _fontFamily
  }
})

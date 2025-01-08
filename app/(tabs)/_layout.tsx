import { _fontFamily } from '@/components/ultis';
import { Tabs } from 'expo-router';
import { Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { Octicons } from "@expo/vector-icons"
import TabBar from '@/components/tabs/TabBar';

interface TabScreenData {
  name: string,
  icon?: any
}

export default function TabLayout() {
  const iconSize = 18
  const tabs : TabScreenData[] = [
    { name: '(home)', icon: 'home' },
    { name: 'settings', icon: 'code-of-conduct' },
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
            tabBarIcon: () => <Octicons name={ tab.icon } size={ iconSize } color="black" />,
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

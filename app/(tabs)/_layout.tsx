import { _fontFamily } from '@/components/ultis';
import { Tabs } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Octicons } from "@expo/vector-icons"
import TabButton from '@/components/tabs/TabButton';

const iconSize = 18

export default function TabLayout() {
  

  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        // tabBarActiveBackgroundColor: 'gray',
        animation: 'shift'
      }}
    >
      <Tabs.Screen 
        name="(home)" 
        options={{
          tabBarIcon: () => <Octicons name="home" size={ iconSize } color="black" />,
          tabBarButton: (props) => <TabButton {...props} />
        }}
      />
      <Tabs.Screen 
        name="settings" 
        options={{
          tabBarIcon: () => <Octicons name="code-of-conduct" size={ iconSize } color="black" />
        }}
      />
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

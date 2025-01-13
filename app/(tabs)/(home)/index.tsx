import { View, StyleSheet } from 'react-native';
import { _Text, _Link, _fontFamily } from '@/components/ultis';
import { PaperProvider } from "react-native-paper"
import Background from '@/components/home/Background';
import { _Layout } from '@/components/ultis';
import HowFeel from '@/components/home/HowFeel';

export default function HomeScreen() {
  return (
    <_Layout>
      <Background />
      <HowFeel />
    </_Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

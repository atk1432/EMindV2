import { View, StyleSheet } from 'react-native';
import { _Text, _Link, _fontFamily } from '@/components/ultis';
import { PaperProvider } from "react-native-paper"
import Background from '@/components/home/Background';
import { _Layout } from '@/components/ultis';
import HowFeel from '@/components/home/HowFeel';
import FeelComment from '@/components/home/FeelComment';
import Suggest from '@/components/home/Suggest';

export default function HomeScreen() {
  return (
    <_Layout>
      <Background />
      <HowFeel />
      <FeelComment />
      <Suggest />
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

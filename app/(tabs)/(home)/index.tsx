import { Link } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { _Text, _Link, _fontFamily } from '@/components/ultis';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <_Text>Homedsfsdf</_Text>
      <_Link href="/details">Details</_Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import { View, StyleSheet } from 'react-native';
import { _Text, _Link, _fontFamily } from '@/components/ultis';
import { PaperProvider } from "react-native-paper"

export default function HomeScreen() {
  return (
    <PaperProvider theme={{
      dark: true
    }}>
      <View style={styles.container}>
        <_Text>Homedsfsdf</_Text>
        <_Link href="/details">Details</_Link>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

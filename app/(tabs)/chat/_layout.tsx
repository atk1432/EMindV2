import { Stack } from 'expo-router';
import MyStack from '@/components/stacks/MyStack';

export default function ChartLayout() {
  return (
    <MyStack>
      <Stack.Screen name="index" />
    </MyStack>
  );
}

import { Stack } from 'expo-router';
import CustomStack from '@/components/stacks/CustomStack';
import MyStack from '@/components/stacks/MyStack';


export default function ChartLayout() {
  return (
    <MyStack>
      <Stack.Screen name="index" />
    </MyStack>
  );
}

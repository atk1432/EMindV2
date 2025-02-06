import { Stack } from 'expo-router';
import MyStack from '@/components/stacks/MyStack';

export default function CategoriesLayout() {
  return (
    <MyStack headerShown={ true }>
      <Stack.Screen name="index" />
      <Stack.Screen name="contents/[slug]"/>
    </MyStack>
  );
}

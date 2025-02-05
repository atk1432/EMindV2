import { Stack } from 'expo-router';
import MyStack from '@/components/stacks/MyStack';

export default function CategoriesLayout() {
  return (
    <MyStack>
      <Stack.Screen name="index" />
      <Stack.Screen name="contents/[slug]"/>
    </MyStack>
  );
}

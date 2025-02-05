import { _Layout, _Text } from "@/components/ultis";
import Card from "@/components/categories/Card";
import { Pressable } from "react-native";
import { navigate } from "expo-router/build/global-state/routing";
import { useNavigation, Link } from "expo-router";

const cards = [
  {
    title: "Bài test",
    image: require("@/assets/images/categories/stress.jpg")
  }
]

export default function CategoriesScreen() {
  return (
    <_Layout size="full">
      { cards.map((card, index) => (
        <Card 
          key={ index }
          title={ card.title }
          image={ card.image }
        />
      ))}
    </_Layout>
  )
}
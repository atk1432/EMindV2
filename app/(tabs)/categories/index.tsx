import { _Layout, _Text, _ContainerWithTitle } from "@/components/ultis";
import Card from "@/components/categories/Card";
import { Pressable } from "react-native";
import { navigate } from "expo-router/build/global-state/routing";
import { useNavigation, Link } from "expo-router";
import { Cards } from "@/components/categories/CardDatas"

export default function CategoriesScreen() {
  return (
    <_Layout size="full">
      <_ContainerWithTitle title="Bộ câu hỏi">
        { Cards.map((card, index) => (
          <Card 
            key={ index }
            name={ card.name }
            title={ card.title }
            describe={ card.describe }
            image={ card.image }
          />
        ))}
      </_ContainerWithTitle>
    </_Layout>
  )
}
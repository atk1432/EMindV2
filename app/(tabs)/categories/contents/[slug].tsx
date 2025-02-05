/* 
  This is file contain content of categories: questions, paper, ....
*/

import { _Layout, _Text } from "@/components/ultis";
import { useLocalSearchParams } from "expo-router";
import { Cards } from "@/components/categories/CardDatas";
import Question from "@/components/categories/contents/Question";
import React from "react";

// get 'slug', filter Cards and show card content 
export default function ContentScreen() {
  const { slug } = useLocalSearchParams()   // slug only integer
  const card = Cards.filter(card => card.name === slug)[0]

  return (
    <>
      { card.type === "questions" ?
        <Question content={ card.content } /> : "" 
      }
    </>
  )
}
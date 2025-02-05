/* 
  This is file contain content of categories: questions, paper, ....
*/

import { _Layout, _Text } from "@/components/ultis";
import { useLocalSearchParams } from "expo-router";


export default function ContentScreent() {
  const { slug } = useLocalSearchParams()

  return (
    <_Layout>
      <_Text>Content { slug }</_Text>
    </_Layout>
  )
}
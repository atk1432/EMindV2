import { _Layout, _Text } from "@/components/ultis";
import ButtonNormal from "@/components/buttons/ButtonNormal";
import { loadTensorflowModel, useTensorflowModel } from "react-native-fast-tflite"
import { useEffect } from "react";
import User from "@/components/user/User";


export default function UserScreen() {
  
  return (
    <_Layout size="full">
      <User />
    </_Layout>
  )
}
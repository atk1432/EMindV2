import { _Layout, _Text } from "@/components/ultis";
import ButtonNormal from "@/components/buttons/ButtonNormal";
import { loadTensorflowModel, useTensorflowModel } from "react-native-fast-tflite"
import { useEffect } from "react";
import MyModule from "@/modules/my-module/src/MyModule";


export default function UserScreen() {
  // const plugin = useTensorflowModel(require("@/assets/models/test_model.tflite"))
  // const runModel = async () => {
  //   // const buffer = new ArrayBuffer(8.0)
  //   const inputData = new Float32Array([4.0])
  //   const outputData = plugin.model?.runSync([inputData])
  //   console.log(outputData)
  // } 
  
  return (
    <_Layout>
      <_Text>{ MyModule.hello() }</_Text>
      <ButtonNormal title="Test tfnlite" />
    </_Layout>
  )
}
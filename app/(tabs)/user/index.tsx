import { _Layout, _Text } from "@/components/ultis";
import ButtonNormal from "@/components/buttons/ButtonNormal";
import { loadTensorflowModel, useTensorflowModel } from "react-native-fast-tflite"
import { useEffect, useState } from "react";
import User from "@/components/user/User";
import * as FileSystem from 'expo-file-system';
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function UserScreen() {

  return (
    <_Layout size="full">
      <ButtonNormal 
        title="Upload"
        onPress={async () => {
          console.log(await AsyncStorage.getItem('emotions'))
        }}
      />
    </_Layout>
  )
}
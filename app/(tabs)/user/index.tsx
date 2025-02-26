import { _Layout, _Text } from "@/components/ultis";
import ButtonNormal from "@/components/buttons/ButtonNormal";
import { EmotionsStorage } from "@/components/home/EmotionData";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function UserScreen() {

  return (
    <_Layout size="full">
      <ButtonNormal 
        title="Upload"
        onPress={async () => {
          const data = JSON.parse((await AsyncStorage.getItem('scores'))!)
          data.map((e: EmotionsStorage) => console.log(e))
        }}
      />
    </_Layout>
  )
}
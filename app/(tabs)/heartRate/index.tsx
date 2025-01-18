import ButtonNormal from "@/components/buttons/ButtonNormal";
import { _Layout, _Text } from "@/components/ultis";
import { StyleSheet } from "react-native";
import { Camera, useCameraPermission, useCameraDevice, CameraDevice } from "react-native-vision-camera"

export default function HeartRateScreen() {
  const device : any = useCameraDevice('back')
  const { hasPermission, requestPermission } = useCameraPermission()

  return (
    <_Layout>
      { hasPermission ? 
        <Camera 
          style={ StyleSheet.absoluteFill }
          device={ device }
          isActive={ true }
        />
      : "" }
      <ButtonNormal 
        onPress={ () => !hasPermission ? requestPermission() : "" }
        title="Bật camera" 
      />
    </_Layout>
  )
}
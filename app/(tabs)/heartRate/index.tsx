import ButtonNormal from "@/components/buttons/ButtonNormal";
import { _Layout, _Text } from "@/components/ultis";
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Camera, useCameraPermission, useCameraDevice, useCameraFormat, CameraDevice } from "react-native-vision-camera"

// import Torch from "react-native-torch"
import Torch from "react-native-torch"


const cameraSize = 300

export default function HeartRateScreen() {
  const [ cameraActive, setCameraActive ] = useState(false)
  const device : any = useCameraDevice('back')
  const lowResolutionFormat = useCameraFormat(device, [
    { videoResolution: { width: 640, height: 480 } },
  ])
  const { hasPermission, requestPermission } = useCameraPermission()

  console.log(cameraActive)

  Torch.switchState(cameraActive)

  useEffect(() => {
    async function checkPermission() {
      const cameraAllowed = await Torch.requestCameraPermission(
          'Camera Permissions', // dialog title
          'We require camera permissions to use the torch on the back of your phone.' // dialog body
      );
  
      if (cameraAllowed) {
        console.log('Camera allowed')
      } else {
        console.log('Not allowed')
      }
    }

    checkPermission()
  }, [])

  return (
    <_Layout size="full" style={ styles.layout }>
      <View style={ styles.camera }>
        { hasPermission ? 
          <Camera 
            format={ lowResolutionFormat }
            // torch="on"
            // fps={30}
            style={[ styles._camera, StyleSheet.absoluteFill ]}
            device={ device }
            isActive={ cameraActive }
          /> 
        : "" }
      </View>
      <ButtonNormal 
        style={ styles.button }
        onPress={ () => !hasPermission ? requestPermission() : setCameraActive(!cameraActive) }
        title={ !cameraActive ? "Bật cameda" : "Tắt camera" }
      />
    </_Layout>
  )
}

const styles = StyleSheet.create({
  layout: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center'
  },
  camera: {
    marginTop: 100,
    height: cameraSize,
    width: cameraSize,
    backgroundColor: "#333",
    borderRadius: 200,
    alignSelf: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  _camera: {
    overflow: 'hidden',
    zIndex: -12
  },
  button: {
    marginTop: 50
  }
})
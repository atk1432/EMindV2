import ButtonNormal from "@/components/buttons/ButtonNormal";
import { _Layout, _Text } from "@/components/ultis";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Camera, useCameraPermission, useCameraDevice, useCameraFormat, CameraDevice, useFrameProcessor } from "react-native-vision-camera"
import { Face, useFaceDetector, FaceDetectionOptions } from 'react-native-vision-camera-face-detector'
// import Torch from "react-native-torch"
import Torch from "react-native-torch"
import { useRSXformBuffer } from "@shopify/react-native-skia";


const cameraSize = 300

export default function HeartRateScreen() {
  const [ cameraActive, setCameraActive ] = useState(false)
  const device : any = useCameraDevice('back')
  const lowResolutionFormat = useCameraFormat(device, [
    { videoResolution: { width: 640, height: 480 } },
  ])
  const { hasPermission, requestPermission } = useCameraPermission()

  // Face options
  const faceDetectionOptions = useRef<FaceDetectionOptions>({

  }).current
  console.log(faceDetectionOptions)
  const faces  = useFaceDetector(faceDetectionOptions)

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    // const faces = detectFaces(frame)
    // console.log(faces)
  }, [])

  useEffect(() => {
    async function checkPermission() {
      const cameraAllowed = await Torch.requestCameraPermission(
          'Camera Permissions', // dialog title
          'We require camera permissions to use the torch on the back of your phone.' // dialog body
      );
  
      if (cameraAllowed) {
        console.log('Flashlight allowed')
      } else {
        console.log('Flashlight not allowed')
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
            frameProcessor={ frameProcessor }
            // torch="on"
            fps={ 10 }
            style={[ styles._camera, StyleSheet.absoluteFill ]}
            device={ device }
            isActive={ cameraActive }
          /> 
        : "" }
      </View>
      <ButtonNormal 
        style={ styles.button }
        onPress={ () => {
          if (!hasPermission) {
            requestPermission() 
          } else {
            setCameraActive(!cameraActive) 
            Torch.switchState(cameraActive)
          }
        }}
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
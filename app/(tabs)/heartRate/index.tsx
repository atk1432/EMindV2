import ButtonNormal from "@/components/buttons/ButtonNormal";
import { _Layout, _Text } from "@/components/ultis";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Camera, useCameraPermission, useCameraDevice, useCameraFormat, useFrameProcessor } from "react-native-vision-camera"
import Torch from "react-native-torch"
import { useTensorflowModel, loadTensorflowModel } from "react-native-fast-tflite";
import {useResizePlugin  } from "vision-camera-resize-plugin"
import { useSharedValue } from "react-native-worklets-core";
import { useSharedValue as _useSharedValue } from "react-native-reanimated"
import { Asset, useAssets } from "expo-asset";


const cameraSize = 300

export default function HeartRateScreen() {
  const [ cameraActive, setCameraActive ] = useState(false)
  const [ assets, error ] = useAssets([require('@/assets/models/test_model.tflite')])
  const device : any = useCameraDevice('back')
  const lowResolutionFormat = useCameraFormat(device, [
    { videoResolution: { width: 640, height: 480 } },
  ])
  const { hasPermission, requestPermission } = useCameraPermission()
  const rgbMeans = useSharedValue(0)
  const shareValue = _useSharedValue(rgbMeans)

  // Plugins
  const { resize } = useResizePlugin()

  // Models
  // console.log(assets)
  const plugin = useTensorflowModel(require('@/assets/models/test_model.tflite'))
  const model = plugin.state === "loaded" ? plugin.model : undefined
  // console.log(model)

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    if (model == null) return

    const resized = resize(frame, {
      scale: {
        width: 128,
        height: 128,
      },
      pixelFormat: 'rgb',
      dataType: "uint8",
    })

    // if (!model)
    const outputs: any = model?.runSync([resized])
    // console.log(outputs)
    rgbMeans.value = outputs[0][0]

  }, [model])

  useEffect(() => {
    async function checkPermission() {
      // Load model
      // var model = await loadTensorflowModel(require('@/assets/models/test_model.tflite'))
      // setModel(model)
    }

    checkPermission()
  }, [])

  // console.log(rgbMeans.get())

  return (
    <_Layout size="full" style={ styles.layout }>
      <View style={ styles.camera }>
        { hasPermission ? 
          <Camera 
            format={ lowResolutionFormat }
            frameProcessor={ frameProcessor }
            torch="on"
            fps={ 10 }
            style={[ styles._camera, StyleSheet.absoluteFill ]}
            device={ device }
            isActive={ cameraActive }
          /> 
        : "" }
      </View>
      <_Text>Red: { rgbMeans.value }</_Text>
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
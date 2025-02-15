import ButtonNormal from "@/components/buttons/ButtonNormal";
import { _Layout, _Text } from "@/components/ultis";
import { useState, useRef, useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Camera, useCameraPermission, useCameraDevice, useCameraFormat, useFrameProcessor } from "react-native-vision-camera"
import Torch from "react-native-torch"
import { useTensorflowModel, loadTensorflowModel } from "react-native-fast-tflite";
import {useResizePlugin  } from "vision-camera-resize-plugin"
import { useSharedValue } from "react-native-worklets-core";
import { useSharedValue as _useSharedValue } from "react-native-reanimated"
import { Asset, useAssets } from "expo-asset";
import { Canvas, Text, matchFont, Fill, Skia } from "@shopify/react-native-skia";
import axios from 'axios'



const cameraSize = 300

export default function HeartRateScreen() {
  const camera = useRef<Camera>(null)
  const [ cameraActive, setCameraActive ] = useState(false)
  const [ assets, error ] = useAssets([require('@/assets/models/test_model.tflite')])
  const device : any = useCameraDevice('back')
  const lowResolutionFormat = useCameraFormat(device, [
    { videoResolution: { width: 640, height: 480 } },
  ])
  const { hasPermission, requestPermission } = useCameraPermission()
  const rgbMeans = useSharedValue(0)
  const shareValue = _useSharedValue(rgbMeans)

  // Skia
  const fontFamily = Platform.select({ ios: "Helvetica", default: "serif" });
  const fontStyle : any = {
    fontFamily,
    fontSize: 14,
    fontStyle: "italic",
    fontWeight: "bold",
  };
  const font = matchFont(fontStyle);

  // Plugins
  const { resize } = useResizePlugin()

  // Models
  // const plugin = useTensorflowModel(require('@/assets/models/test_model.tflite'))
  // const model = plugin.state === "loaded" ? plugin.model : undefined

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet'
    // if (model == null) return

    const resized = resize(frame, {
      scale: {
        width: 128,
        height: 128,
      },
      pixelFormat: 'rgb',
      dataType: "uint8",
    })

    // const outputs: any = model?.runSync([resized])
    // rgbMeans.value = outputs[0][0]

  }, [])

  const uploadVideo = async (fileUri: string) => {
    console.log('Upload video...')
    const formData = new FormData()
    formData.append('video', {
      uri: fileUri,
      name: 'video.mp4',
      type: 'video/mp4'
    })
    console.log(formData)
    try {
      const response = await axios.post('http://192.168.0.102/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 2000
      })
      // const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
      console.log(response)
    } catch (err : any) {
      if (err.response) {
        console.error(err.response.status); // Get the status code on error
        console.error(`Error: ${err.response.status} - ${err.response.statusText}`);
      } else {
        console.error('Network error');
      }
    }
  }

  useEffect(() => {
    (async () => {
      if (cameraActive && camera.current) {
        console.log("Start recording")
        const video = camera.current.startRecording({
          onRecordingFinished: (video) => {
            console.log("Video recorded: ", video.path)
            const fileUri = video.path
            uploadVideo(fileUri)
          },
          onRecordingError: (error) => {
            console.error('Recording error: ', error)
          }
        })
      } else {
        console.log("Stop recording")
        if (camera.current)
          await camera.current.stopRecording();
      }
    })()
  }, [cameraActive])


  return (
    <_Layout size="full" style={ styles.layout }>
      <View style={ styles.camera }>
        { hasPermission ? 
          <Camera 
            ref={ camera }
            format={ lowResolutionFormat }
            frameProcessor={ frameProcessor }
            torch="on"
            fps={ 10 }
            style={[ styles._camera, StyleSheet.absoluteFill ]}
            device={ device }
            isActive={ cameraActive }
            video={ true }
          /> 
        : "" }
      </View>
      <_Text>Red: { rgbMeans.value }</_Text>
      <Canvas>
        <Text 
          x={0}
          y={ fontStyle.fontSize }
          text="Hello world"
          font={font}
        />
      </Canvas>
      <ButtonNormal 
        style={ styles.button }
        onPress={ async () => {
          if (!hasPermission) {
            requestPermission() 
          } else {
            setCameraActive(!cameraActive) 
          }
        }}
        title={ !cameraActive ? "Bật camera" : "Tắt camera" }
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
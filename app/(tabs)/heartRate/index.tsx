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
import * as FileSystem from 'expo-file-system';
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

  }, [])

  const uploadVideo = async (fileUri: string) => {
    console.log('Upload video.......')

    // Upload video file start
    const formData = new FormData();
    formData.append('file', {
      uri: fileUri,
      name: 'video.mov',
      type: 'video/quicktime', // Correct MIME type
    });

    try {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://192.168.6.110:5000/u', true);
      xhr.setRequestHeader('Content-Type', 'multipart/form-data');
      
      xhr.onload = async () => {
        if (xhr.status === 200) {
          console.log('Upload success:', xhr.responseText);
          // Try delete file 
          await FileSystem.deleteAsync(fileUri!)
          console.log('Delete file successfully!')
        } else {
          console.error('Upload failed:', xhr.responseText);
        }
      };
  
      xhr.onerror = function () {
        console.error('Upload error');
      };
  
      xhr.send(formData);
    } catch (error) {
      console.error('Upload error:', error);
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
            uploadVideo('file://' +  fileUri)
          },
          onRecordingError: (error) => {
            console.error('Recording error: ', error)
          }
        })
      } else {
        if (camera.current) {
          await camera.current.stopRecording();
          console.log("Stop recording")
        }
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
            fps={ 30 }
            style={[ styles._camera, StyleSheet.absoluteFill ]}
            device={ device }
            isActive={ cameraActive }
            video={ true }
          /> 
        : "" }
      </View>
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
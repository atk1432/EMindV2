import { _Layout, _Text } from "@/components/ultis";
import ButtonNormal from "@/components/buttons/ButtonNormal";
import { loadTensorflowModel, useTensorflowModel } from "react-native-fast-tflite"
import { useEffect } from "react";
import User from "@/components/user/User";
import * as FileSystem from 'expo-file-system';
import axios from 'axios'


export default function UserScreen() {
  
  // const getComponent = async () => {
  //   return DocumentPicker.getDocumentAsync()
  // }

  useEffect(() => {
    (async () => {
      if (FileSystem.cacheDirectory)
        console.log(await FileSystem.readDirectoryAsync(FileSystem.cacheDirectory))
    })()
  }, [])

  return (
    <_Layout size="full">
      <ButtonNormal 
        title="Upload"
        onPress={async () => {
          console.log('Upload video........')
          const fileUri = 'file:///data/user/0/com.atk1432.EMindV2/cache/mrousavy5443708760942255897.mov'

          // try {
          //   const response = await FileSystem.uploadAsync('http://192.168.0.107:5000/u', fileUri)
          //   console.log(JSON.stringify(response, null, 4))
          // } catch (error) {
          //   console.error(error)
          // }

          const formData = new FormData();
          formData.append('file', {
            uri: fileUri,
            name: 'video.mov',
            type: 'video/quicktime', // Correct MIME type
          });
      
          try {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://192.168.0.107:5000/u', true);
            xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        
            xhr.onload = function () {
              if (xhr.status === 200) {
                console.log('Upload success:', xhr.responseText);
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
        }}
      />
    </_Layout>
  )
}
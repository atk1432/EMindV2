import { _Layout, _Text } from "@/components/ultis";
import ButtonNormal from "@/components/buttons/ButtonNormal";
import { loadTensorflowModel, useTensorflowModel } from "react-native-fast-tflite"
import { useEffect } from "react";
import MyModule from "@/modules/my-module/src/MyModule";
import {ScreenCapturePickerView,
	RTCPeerConnection,
	RTCIceCandidate,
	RTCSessionDescription,
	RTCView,
	MediaStream,
	MediaStreamTrack,
	mediaDevices,
	registerGlobals
} from "react-native-webrtc"

export default function UserScreen() {

  // useEffect(() => {
  //   (async () => {
  //     let cameraCount = 0;
  //     let mediaConstraints = {
  //       audio: false,
  //       video: {
  //         frameRate: 30,
  //         facingMode: 'user'
  //       }
  //     };
  //     let peerConstraints = {
  //       iceServers: [
  //         {
  //           urls: 'stun:stun.l.google.com:19302'
  //         }
  //       ]
  //     };


  //     // Get available media devices
  //     try {
  //       const devices : any = await mediaDevices.enumerateDevices();

  //       devices.map((device: any) => {
  //         if ( device.kind != 'videoinput' ) { return; };

  //         cameraCount = cameraCount + 1;
  //       } );
  //     } catch( err ) {
  //       return
  //     };
      


  //     // Getting media stream using getUserMedia
  //     let localMediaStream : MediaStream | null;
  //     let isVoiceOnly = false;

  //     try {
  //       const mediaStream = await mediaDevices.getUserMedia( mediaConstraints );

  //       if ( isVoiceOnly ) {
  //         let videoTrack = await mediaStream.getVideoTracks()[ 0 ];
  //         videoTrack.enabled = false;
  //       };

  //       localMediaStream = mediaStream;
  //     } catch( err ) {
  //       return
  //     };


  //     let peerConnection : RTCPeerConnection | null 
  //     peerConnection = new RTCPeerConnection( peerConstraints );

      
  //     // Destroying
  //     localMediaStream.getTracks().forEach(    // Destroy Media Stream
  //       track => track.stop()
  //     );
      
  //     localMediaStream = null;

  //     peerConnection.close();         // Detroy peer connection
  //     peerConnection = null;

  //     console.log(cameraCount)
  //   }) ()
  // }, [])
  
  return (
    <_Layout>
      <_Text>{ MyModule.hello() }</_Text>
      <ButtonNormal title="Test tfnlite" />
    </_Layout>
  )
}
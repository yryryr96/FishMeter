import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert} from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Camera, CameraType } from 'expo-camera';

import { useEffect, useState, useRef} from 'react';
export default function CameraFunc() {

  const [type, setType] = useState(CameraType.back);
  const [permission, setPermission] = useState(true);
  const [Image, setImage] = useState(null);
  const ref = useRef(null)

  const saveToAppStorage = async (uri) => {
    const appDir = FileSystem.documentDirectory + 'photos/';
    const fileName = 'photo.jpg';
    const newPath = appDir + fileName;
    await FileSystem.makeDirectoryAsync(appDir, { intermediates: true });
    await FileSystem.moveAsync({ from: uri, to: newPath });
    return newPath; // 저장된 파일의 경로를 반환
  };

  const ask = async() => {
    const {granted} = await Camera.requestCameraPermissionsAsync();
    // console.log(pr)
    if (!granted) {
      setPermission(false)
      
    }
  }

  useEffect(()=>{
    // setPermission(false)
    ask()
  },[])

  const _takePhoto = async () => {
    await ref.current.takePictureAsync()
    .then((data) => {
      setImage(data)
      console.log(data)
    })
    
  }

  
  if (!permission) {
    return <Text>No access</Text>
  }


  return (
    <View style={{ flex: 1}}>
      <Camera style={{ flex: 0.8 }} type={type} ref={ref}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent:"center",
            alignItems:'flex-end',
            flexDirection: 'row',
          }}>
        </View>
      </Camera>
      
      <View 
        style={{
          flex:0.1, 
          flexDirection:"row",
          justifyContent:"center",
          alignItems:"center"
          }}>
        <TouchableOpacity
          style={{
            // flex: 0.1,
            // alignSelf: 'flex-end',
            alignItems: 'center',
            backgroundColor : 'red',
            marginRight : 30,
            borderRadius: 50
          }}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
          <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={_takePhoto}
          style={{backgroundColor:'blue', borderRadius:50}}
        >
          <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>Snap Photo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import "moment/locale/ko";
import { Camera } from "expo-camera";
import { useCameraDevices } from "react-native-vision-camera";
const Login = () => {
  const devices = useCameraDevices();
  const device = devices.back;
  useEffect(() => {
    const checkPermission = async () => {
      // 카메라 권한 확인
      const cameraPermission = await Camera.getCameraPermissionStatus();

      switch (cameraPermission) {
        case "authorized":
          // 카메라 권한이 있을때 실행할 로직
          break;

        case "not-determined":
          // 아직 권한 요청을 하지 않은 상태로 새롭게 권한 요청하기
          const newCameraPermission = await Camera.requestCameraPermission();

          if (newCameraPermission === "authorized") {
            // 카메라 권한이 있을때 실행할 로직
          } else if (newCameraPermission === "denied") {
            // 권한 요청을 했지만 거부됐을때 실행할 로직
            // ex) 설정으로 이동, 권한이 없으면 카메라 실행할 수 없다는 알림창 등등
            await Linking.openSettings();
          }
          break;

        case "denied":
          // 권한 요청을 했지만 거부됐을때 실행할 로직
          // ex) 설정으로 이동, 권한이 없으면 카메라 실행할 수 없다는 알림창 등등
          await Linking.openSettings();
          break;
      }
    };

    checkPermission();
  }, []);
  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      photo={true}
      video={false}
      audio={false} // 선택사항
      isActive={true}
    />
  );
};

const styles = StyleSheet.create({});

export default Login;

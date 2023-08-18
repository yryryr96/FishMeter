import React from "react";
import { View, Text } from "react-native";
import { RNCamera } from "react-native-camera";
import PropTypes from "deprecated-react-native-prop-types";

const CameraScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <RNCamera
        style={{ flex: 1 }}
        type={RNCamera.Constants.Type.back} // 뒷면 카메라 사용
        flashMode={RNCamera.Constants.FlashMode.off} // 플래시 끄기
      />
      <View
        style={{
          flex: 0.1,
          backgroundColor: "transparent",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
          카메라 화면
        </Text>
      </View>
    </View>
  );
};

// PropTypes 정의
CameraScreen.propTypes = {
  // RNCamera의 type prop은 문자열("back" 또는 "front") 타입이어야 합니다.
  type: PropTypes.oneOf([
    RNCamera.Constants.Type.back,
    RNCamera.Constants.Type.front,
  ]),

  // RNCamera의 flashMode prop은 문자열("auto", "on", "off", "torch") 타입이어야 합니다.
  flashMode: PropTypes.oneOf([
    RNCamera.Constants.FlashMode.auto,
    RNCamera.Constants.FlashMode.on,
    RNCamera.Constants.FlashMode.off,
    RNCamera.Constants.FlashMode.torch,
  ]),

  // 다른 필요한 PropTypes를 여기에 추가할 수 있습니다.
};

// 기본 props 값 설정
CameraScreen.defaultProps = {
  type: RNCamera.Constants.Type.back,
  flashMode: RNCamera.Constants.FlashMode.off,
};

export default CameraScreen;

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
import { Fontisto } from "@expo/vector-icons";

const Login = () => {
  useEffect(() => {}, []);
  const naver = () => console.log("naver");
  const kakao = () => console.log("kakao");

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/Group.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={naver}>
          <Image
            source={require("./assets/naver.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={kakao}>
          <Image
            source={require("./assets/kakao.png")}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B6CEE2",
    padding: 16,
    alignItems: "center",
  },
  logo: {
    top: 50,
    width: 200,
    height: 200,
  },
  imageContainer: {
    flexDirection: "column", // 이미지들을 세로 방향으로 나란히 배치
    alignItems: "center", // 이미지들을 가운데로 정렬
    marginVertical: 150, // 이미지들 사이에 간격을 주기 위한 마진
  },
  image: {
    width: 200,
    height: 90,
  },
});

export default Login;

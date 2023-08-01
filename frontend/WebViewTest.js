import * as React from "react";
import { WebView } from "react-native-webview";
import { Alert, StyleSheet, View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WebViewTest() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 200,
          width: 200,
          backgroundColor: "pink",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={require("./assets/Group.png")} style={{}} />
      </View>

      <TouchableOpacity
        style={{
          width: "100%",
          alignItems: "center",
          borderRadius: 20,
          margin: 20,
        }}
        onPress={() =>
          navigation.navigate("KaKaoLogin", { screen: "KaKaoLogin" })
        }
      >
        <Image
          style={{}}
          source={require("./assets/kakaoLogin/kakao_login_large_narrow.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: "70%",
          backgroundColor: "green",
          alignItems: "center",
          borderRadius: 20,
          margin: 20,
        }}
        onPress={() =>
          navigation.navigate("KaKaoLogOut", { screen: "KaKaoLogOut" })
        }
      >
        <Text style={{ fontSize: 30, color: "white" }}>카카오 로그아웃</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={{
          width: "70%",
          backgroundColor: "green",
          alignItems: "center",
          borderRadius: 20,
          margin: 20,
        }}
        onPress={() =>
          navigation.navigate("TestImage")
        }
      >
        <Text style={{ fontSize: 30, color: "white" }}>이미지 선탣하러가기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B6CEE2",
    alignItems: "center",
  },
});
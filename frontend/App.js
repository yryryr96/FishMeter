import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Tabs from "./navigation/tabs";
import DogamGallery from "./screens/dogam/DogamGallery";
import KaKaoLogin from "./KaKaoLogin";
import KaKaoLogOut from "./KaKaoLogOut";
import DogamDetail from "./screens/dogam/DogamDetail";
import { RecoilRoot } from "recoil";
import Home from "./Home";
import CalendarGallery from "./screens/dogam/CalendarGallery";
import useCustomFont from "./font/useCustomFont";

import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

function FontText({ fontFileName, children }) {
  const isFontLoaded = useCustomFont(fontFileName);

  if (!isFontLoaded) {
    return null;
  }

  return <Text style={styles.text}>{children}</Text>;
}

export default function App() {
  const [state, setState] = useState(false);

  useEffect(()=>{
    SplashScreen.hide();

    const getUser = async () => {
      const userAccessToken = await AsyncStorage.getItem("userAccessToken")
      const user = await AsyncStorage.getItem("user");
      console.log("App.js",userAccessToken)
      console.log("App.js",user)
      if (userAccessToken !== null || user !== null) {
        setState(true);
        // console.log("App.js",userAccessToken)

      }
    }
    
    getUser()
          
  },[])
  
  return (
    <View style={{ flex: 1 }}>
      {!state ? (
        <View>
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              marginTop: 100,
              paddingLeft: 30,
              paddingTop: 30,
              width: "100%",
              height: 230,
            }}
          >
            <View style={{ marginBottom: 20 }}>
              <FontText
                fontFileName={require("./assets/fonts/HakgyoansimWoojuR.ttf")}
              >
                <Text
                  style={{ color: "#515151", fontSize: 45, fontWeight: "bold" }}
                >
                  FishMeter
                </Text>
              </FontText>
            </View>
            <FontText
              fontFileName={require("./assets/fonts/HakgyoansimWoojuR.ttf")}
            >
              <Text
                style={{ color: "#515151", fontSize: 35, fontWeight: "bold" }}
              >
                사진 한장으로
              </Text>
            </FontText>
            <FontText
              fontFileName={require("./assets/fonts/HakgyoansimWoojuR.ttf")}
            >
              <Text
                style={{ color: "#515151", fontSize: 35, fontWeight: "bold" }}
              >
                기록을 남겨보세요
              </Text>
            </FontText>
            <TouchableOpacity onPress={() => setState(true)}>
              <Image
                style={{ borderRadius: 15, marginTop: 10 }}
                source={require("./assets/kakaoLogin/kakao_login_medium_narrow.png")}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              position: "absolute",
              top: "26%",
              marginLeft: 30,
              zIndex: 1,
              margin: 10,
              alignItems: "center",
            }}
          ></View>
          <View style={{}}>
            <Image
              source={require("./assets/Login/sea.gif")}
              style={{ width: "100%", height: "100%", opacity: 1 }}
            />
          </View>
        </View>
      ) : (
        <NavigationContainer>
          <RecoilRoot>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="KaKaoLogin" component={KaKaoLogin} />
              <Stack.Screen name="Root" component={Tabs} />
              <Stack.Screen name="DogamGallery" component={DogamGallery} />
              <Stack.Screen name="DogamDetail" component={DogamDetail} />
              <Stack.Screen
                name="CalendarGallery"
                component={CalendarGallery}
              />
              <Stack.Screen name="KaKaoLogOut" component={KaKaoLogOut} />
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          </RecoilRoot>
        </NavigationContainer>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    // fontFamily: "customFont",
  },
});


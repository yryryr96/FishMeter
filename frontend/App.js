import {
  Text,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import Tabs from "./navigation/tabs";
import DogamGallery from "./screens/dogam/DogamGallery";
import KaKaoLogin from "./KaKaoLogin";
import KaKaoLogOut from "./KaKaoLogOut";
import DogamDetail from "./screens/dogam/DogamDetail";
import { RecoilRoot } from "recoil";
import TestImage from "./TestImage";
import Home from "./Home";
import CalendarGallery from './screens/dogam/CalendarGallery';

const Stack = createNativeStackNavigator();

export default function App() {
  const [state,setState] = useState(false)
  return (
    <View style={{flex:1}}>
      {!state ? 
      <View style={{ justifycontent: "center" }}>
        <View
          style={{
            position: "absolute",
            top: "25%",
            left: "25%",
            zIndex: 1,
            margin: 10,
          }}
        >
          <TouchableOpacity onPress={() => setState(true)}>
            <Image
              source={require("./assets/kakaoLogin/kakao_login_medium_narrow.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={{}}>
          <Image
            source={require("./assets/Login/sea.gif")}
            style={{ width: "100%", height: "100%" }}
            // resizeMode="cover"
          />
        </View>
      </View>
      :
      <NavigationContainer>
        <RecoilRoot>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={Tabs} />
            <Stack.Screen name="DogamGallery" component={DogamGallery} />
            <Stack.Screen name="CalendarGallery" component={CalendarGallery} />
            <Stack.Screen name="DogamDetail" component={DogamDetail} />
            <Stack.Screen name="KaKaoLogin" component={KaKaoLogin} />
            <Stack.Screen name="KaKaoLogOut" component={KaKaoLogOut} />
            <Stack.Screen name="TestImage" component={TestImage} />
            <Stack.Screen name="HomeTest" component={Home} />
          </Stack.Navigator>
        </RecoilRoot>
      </NavigationContainer>
      }
      
    </View>
  );
}

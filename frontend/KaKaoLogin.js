import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const REST_API_KEY = 'f55712663179d181a09716e3fbe37ac0'
const REDIRECT_URI = 'http://192.168.166.11:19006/kakao'
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
  
export default function KaKaoLogin() {
    AsyncStorage.clear()

    const navigation = useNavigation();

    const KakaoLoginWebView = (data) => {
    console.log('data=',data)
      const exp = "code=";
      const condition = data.indexOf(exp);    
      if (condition != -1) {
        const authorize_code = data.substring(condition + exp.length);
        // console.log("authorize_code=",authorize_code);
        requestToken(authorize_code);
      };
    }

    const requestToken = async (authorize_code) => {
        let AccessToken = "none";
        axios({
            method : 'post',
            url : 'https://kauth.kakao.com/oauth/token',
            params : {
                grant_type: 'authorization_code',
                client_id : REST_API_KEY,
                redirect_uri : REDIRECT_URI,
                code: authorize_code
            }
        }).then((res) => {
            AccessToken = res.data.access_token;
            console.log('login success !', AccessToken)
            storeData(AccessToken)
            navigation.navigate("Gps",{screen : "Gps"})
        }).catch((e)=> {
            console.log('error',e);
        })
    }

    // const requestUserInfo= (AccessToken) => {
    //     axios({
    //         method : 'get',
    //         url : 'https://kapi.kakao.com/v2/user/me',
    //         headers : {
    //             Authorization : `Bearer ${AccessToken}`
    //         }
    //     }).then((res) => {
    //         // console.log(res)
    //         console.log(res.data)
    //     }).catch((e) => {
    //         console.log("error",e)
    //     })
    // }

    const storeData = async (returnValue) => {
        try {
            await AsyncStorage.setItem("userAccessToken",returnValue);
        } catch(err) {
            console.log(err)
        }
    }
    
    return (
      <SafeAreaProvider style={styles.container}>      
        <WebView
          style={{ flex: 1 }}
          originWhitelist={['*']}
          scalesPageToFit={false}
          source={{
            uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
          }}
          injectedJavaScript={INJECTED_JAVASCRIPT}
          javaScriptEnabled
          onMessage={event => { KakaoLoginWebView(event.nativeEvent["url"])}}
        />
      </SafeAreaProvider>
    )
}
    
const styles = StyleSheet.create({
container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',
},    
});
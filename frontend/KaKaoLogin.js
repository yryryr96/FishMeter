import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { testDefaultGps, userId } from './component/recoil/selectors/testSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRecoilState } from "recoil";
import {KAKAO_API_KEY, KAKAO_REDIRECT_URI} from '@env'
const REST_API_KEY = KAKAO_API_KEY
const REDIRECT_URI = KAKAO_REDIRECT_URI
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

// 인가 코드 요청
export default function KaKaoLogin() {
    AsyncStorage.clear()
    const [user, setUser] = useRecoilState(userId);
    const navigation = useNavigation();

    const KakaoLoginWebView = (data) => {
    // console.log('data=',data)
      const exp = "code=";
      const condition = data.indexOf(exp);
      if (condition != -1) {
        const authorize_code = data.substring(condition + exp.length);
        // console.log("authorize_code=",authorize_code);
        requestToken(authorize_code);
      };
    }

    // 액세스 토큰 요청
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
            sendToken(AccessToken)
            storeData(AccessToken)
            // requestUserInfo(AccessToken)
            navigation.navigate("Root",{screen : "Root"})
        }).catch((e)=> {
            console.log('error',e);
        })
    }

    // 서버로 액세스 토큰 전달
    const sendToken = (AccessToken) => {
    axios({
        method: 'get',
        url: 'http://54.206.147.12/user',
        headers: {
            Authorization : `Bearer ${AccessToken}`
        }
    }).then((res) => {
        console.log('SUUUUUUUUUUUUUUUUUUUUUUUUI', res.data);
        setUser(res.data.id)
        const setUserId = async () => {
            await AsyncStorage.setItem("user",res.data.id)
        }
        setUserId()
    }).catch((e) => {
        console.error("NNNNNNNNNNOOOOOOOOOOO", e);
    });
};

    // const requestUserInfo= (AccessToken) => {
    //   console.log("USERINFO")
    //     axios({
    //         method : 'get',
    //         url : 'https://kapi.kakao.com/v2/user/me',
    //         headers : {
    //             Authorization : `Bearer ${AccessToken}`
    //         }
    //     }).then((res) => {
    //         // console.log(res)
    //         
    //         console.log(res.data)
    //     }).catch((e) => {
    //         console.log("error",e)
    //     })
    // }

    const storeData = async (returnValue) => {
        try {
            await AsyncStorage.setItem("userAccessToken",returnValue);
            console.log("return",returnValue)
        } catch(err) {
            console.log(err)
        }
    }

    // useEffect(()=>{
    //     const getUser = async () => {
    //         const userId = await AsyncStorage.getItem("user")
    //     }
    //     if (userId !== null ) {
    //         // navigation.navigate("Root")
    //     }
    //     getUser()
    // },[])
    
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
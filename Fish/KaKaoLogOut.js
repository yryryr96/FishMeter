import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { WebView } from 'react-native-webview';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function KaKaoLogOut() {
    const navigation = useNavigation();
    const requestLogout = async () => {
        console.log("logout")
        const AccessToken = await AsyncStorage.getItem("userAccessToken")
        console.log(AccessToken)
        axios({
            method : 'post',
            url : 'https://kapi.kakao.com/v1/user/unlink',
            headers : {
                Authorization : `Bearer ${AccessToken}`
            }
        }).then((res) => {
            console.log(res)
            navigation.navigate("Gps",{screen : "Gps"})
        }).catch((e) => {
            console.log(e)
        })
        
    }

    return (
        <SafeAreaProvider style={styles.container}>
            <TouchableOpacity onPress={requestLogout}>
                <Text style={{fontSize:30}}>카카오 로그아웃</Text>
            </TouchableOpacity>
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
import * as React from 'react';
import { WebView } from 'react-native-webview';
import { Alert, StyleSheet,View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WebViewTest() {
  const navigation = useNavigation();

  return (
    <View style={{flex:1, justifyContent : 'center', alignItems :'center'}}>
      <Text>로그인 화면</Text>
      <TouchableOpacity 
        style={{width : "70%", backgroundColor : 'green', alignItems : 'center', borderRadius : 20, margin:20}}
        onPress={()=>navigation.navigate("KaKaoLogin",{screen:"KaKaoLogin"})}
        >
        <Text style={{fontSize:30, color : 'white' }}>카카오 로그인</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={{width : "70%", backgroundColor : 'green', alignItems : 'center', borderRadius : 20, margin:20}}
        onPress={()=>navigation.navigate("KaKaoLogOut",{screen:"KaKaoLogOut"})}
        >
        <Text style={{fontSize:30, color : 'white' }}>카카오 로그아웃</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container : {
    flex:1,
    justifyContent :'center',
    alignItems :'center'
  },
})
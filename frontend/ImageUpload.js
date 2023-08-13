import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity,StyleSheet,Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageUpload() {

    const [imageUrl, setImageUrl] = useState();
    
    const getPermission = async () => {
        if (Platform.OS !== 'web') {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('권한이 필요합니다.');
                return false
            }
            return true
        }
    }

    const pickImage = async () => {
        console.log("이미지 선택");
        let imageData = await ImagePicker.launchImageLibraryAsync({
            mediaTypes : ImagePicker.MediaTypeOptions.All,
            allowsEditing : true,
            aspect : [1,1],
            quality:1,
        })
        
        // console.log('이미지 데이터:', imageData)
        // console.log("UUUUUUUUUUUURRRRRRRRRIIIIIIII=",imageData.assets[0].uri)
    
        setImageUrl(imageData.assets[0].uri);
    }
    
    useEffect(()=>{
        getPermission()
    },[])

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={pickImage}>
                    <Text style={{fontSize:50}}>이미지 선택</Text>
                </TouchableOpacity>
            </View>
            <Image source={{uri : imageUrl}} style={{width:"50%", height:"30%", margin : 50}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent :'center',
        alignContent : 'center'
    },    
});

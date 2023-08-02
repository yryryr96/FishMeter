import React, {useState} from 'react';
import { Image, StyleSheet, Text, View,TouchableOpacity, Alert } from 'react-native';

export default function SpotArticle({item}) {
    console.log("item",item)
    return(
        
        <View style={styles.articleContainer}>
            <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>Alert.alert('hh')}>
            <View style={styles.imgContainer}>
                <Image source={{ uri : item.image}} style={{height:55, borderRadius:10}}/>
            </View>
            
            <View style={styles.infoContainer}>
                <Text>날짜</Text>
                <Text>어종</Text>
                <Text>{item.latitude} {item.longitude}</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    articleContainer : {
        flexDirection : 'row',
        backgroundColor : 'transparent' ,
        // justifyContent : 'center',
        // alignItems : 'center',
        marginBottom : 6,
        borderColor : 'transparent',
        borderBottomColor : 'grey',
        borderWidth : 1,
        paddingHorizontal:"6%"
    },
    line: {
        height: 10,
        backgroundColor: 'blue',
        marginHorizontal : "8%",
        marginBottom : "5%"

        // width, margin 등의 스타일을 조정하여 수평선의 모양을 변경할 수 있습니다.
      },
      imgContainer : {
        width:"30%",
        alignContent:'center',
        justifyContent:'center',
        marginRight : "6%",
        marginBottom : "5%"
      },
      infoContainer : {
        width:"70%"
      }
})
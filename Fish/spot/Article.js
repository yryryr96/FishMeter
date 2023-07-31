import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SpotArticle({item}) {
    return(
        <View style={styles.articleContainer}>
            <View style={styles.imgContainer}><Text>{item.language}</Text></View>
            <View style={styles.infoContainer}>
                <Text>날짜</Text>
                <Text>어종</Text>
                <Text>위치</Text>
            </View>
            
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
        width:"30%"
      },
      infoContainer : {
        width:"70%"
      }
})
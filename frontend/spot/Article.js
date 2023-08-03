import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { Image, StyleSheet, Text, View,TouchableOpacity, Alert } from 'react-native';

export default function SpotArticle({item,ArticleModalVisible,setArticleModalVisible}) {
    console.log("item",item)

    const navigation = useNavigation();
    
    const handlePress = () => {
        navigation.navigate('DogamDetailTest', item);
        setArticleModalVisible(false)
    };

    return(
        <View style={styles.articleContainer}>
            <TouchableOpacity style={{flexDirection:'row'}} onPress={handlePress}>
            <View style={styles.imgContainer}>
                <Image source={{ uri : item.src1}} style={{height:110}}/>
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
        marginTop : 15,
        borderColor : 'transparent',
        borderBottomColor : 'grey',
        borderWidth : 1,
        paddingHorizontal:"6%"
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
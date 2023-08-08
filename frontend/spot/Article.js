import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { Image, StyleSheet, Text, View,TouchableOpacity, Alert } from 'react-native';
import HourlyWeather from './Weathers';

export default function SpotArticle({item,ArticleModalVisible,setArticleModalVisible}) {
    const navigation = useNavigation();
    const propItem = {
        "itemName" : item.id,
        "itemSize" : item.size,
        "itemSrc" : item.src1,
    }
    
    const handlePress = () => {
        navigation.navigate('DogamDetail', propItem);
        setArticleModalVisible(false)
    };

    return(
        <View style={styles.articleContainer}>
            <TouchableOpacity style={{flexDirection:'row'}} onPress={handlePress}>
            <View style={styles.imgContainer}>
                <Image source={{ uri : item.src1}} style={{height:110}}/>
            </View>
            
            <View style={styles.infoContainer}>
                <Text style={styles.articleText}>날짜</Text>
                <Text style={styles.articleText}>{item.title}</Text>
                <Text style={styles.articleText}>{item.address}</Text>
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
        width:"70%",
    },
    articleText : {
        marginVertical : 5,
        fontSize : 12
    }
})
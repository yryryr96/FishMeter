import { useNavigation } from '@react-navigation/native';
import React, {useState} from 'react';
import { Image, StyleSheet, Text, View,TouchableOpacity, Alert } from 'react-native';
import HourlyWeather from './Weathers';

export default function SpotArticle({item,ArticleModalVisible,setArticleModalVisible}) {
    const navigation = useNavigation();
    const propItem = {
        "itemName" : item.species,
        "itemSize" : item.length,
        "itemSrc" : item.imageUrl,
        "itemId" : item.id,
        "itemAddress" : item.address,
        "itemDate" : item.createdAt,
        "itemLat" : item.latitude,
        "itemLon" : item.longitude
    }
    
    const handlePress = () => {
        navigation.navigate('DogamDetail', propItem);
        setArticleModalVisible(false)
    };

    return(
        <View style={styles.articleContainer}>
            <View style={{marginVertical : 5}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={handlePress}>
                    <View style={styles.imgContainer}>
                        <Image source={{ uri : item.imageUrl}} style={{height:110, borderRadius:5}}/>
                    </View>
                    
                    <View style={styles.infoContainer}>
                        <Text style={styles.articleText}>{item.createdAt.substring(0,10)}</Text>
                        <Text style={styles.articleText}>{item.species}</Text>
                        <Text style={styles.articleText}>{item.address}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    articleContainer : {
        flexDirection : 'row',
        backgroundColor : 'transparent' ,
        borderColor : 'transparent',
        borderTopColor : 'grey',
        borderWidth : 1,
    },
    imgContainer : {
        width:"50%",
        alignContent:'center',
        justifyContent:'center',
        // marginRight : "6%",
        padding : 10,
    },
    infoContainer : {
        width:"50%",
        backgroundColor:'transparent',
        paddingTop : 10
    },
    articleText : {
        marginVertical : 5,
        fontSize : 15
    }
})
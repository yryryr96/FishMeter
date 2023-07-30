import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { useRecoilState } from 'recoil';
import { testGpsList } from '../component/recoil/atoms/test';

export default function ModalArticle({ArticleModalVisible,setArticleModalVisible}) {  
    const [articleInfo, setArticleInfo] = useRecoilState(testGpsList)
    const closeArticleModal = () => {
        setArticleModalVisible(false)
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ArticleModalVisible}
            onRequestClose={() => {
                setArticleModalVisible(!ArticleModalVisible);
            }
        }>  
            <View style={styles.ArticleContainer}>
                {articleInfo.map((item,index) => (
                    <Text key={index} style={{fontSize:30}}>{item.toString()}</Text>
                ))}    
            </View>
            
            <View>
                <TouchableOpacity onPress={closeArticleModal} style={styles.modalButtonContainer}>
                        <Text>닫기</Text>
                </TouchableOpacity>
            </View>
        </Modal>

    )
}

const styles = StyleSheet.create({
    ArticleContainer : {
        backgroundColor : 'white',
        alignItems : 'center',
        justifyContent : 'center',
        flex : 1,
        width: '100%',
    },
    modalButtonContainer : {
        paddingVertical:"5%",
        paddingHorizontal:'30%', 
        width:"100%",
        flexDirection:'row', 
        justifyContent:'space-between'
    }
});
  
  
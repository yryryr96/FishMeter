import React, {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, View,ScrollView} from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import { testGpsList } from '../component/recoil/atoms/test';
import SpotArticle from './Article';
import { MaterialIcons } from '@expo/vector-icons';
import { filteredArticle, testDefaultGps } from '../component/recoil/selectors/testSelector';


export default function ModalArticle({ArticleModalVisible,setArticleModalVisible,filteredList,city}) {
    // console.log(filteredList)
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
        <View style={styles.articleModalContainer} onPress={closeArticleModal}>
            <View style={styles.modalInnerContainer}>
                
                <View style={styles.headerContainer}>
                    <Text style={{fontSize : 30, fontWeight : "600"}}>게시글</Text>
                    <MaterialIcons name="close" size={40} color="black" onPress={closeArticleModal} />
                </View>

                
                <View>
                    <Text style={styles.articleCountText}>{filteredList?.length}개의 게시글</Text>
                </View>
                
                <ScrollView>
                  <View>
                    {filteredList.map((item,index) => (
                        <SpotArticle key={index} item={item} ArticleModalVisible={ArticleModalVisible} setArticleModalVisible={setArticleModalVisible} />
                    ))}
                  </View>
                </ScrollView>
            </View>
        </View>
    </Modal>

    )
}

const styles = StyleSheet.create({
  articleModalContainer : {
      backgroundColor : 'transparent',
      alignItems : 'center',
      justifyContent : 'center',
      flex : 1,
      width: '100%',
    },
    modalInnerContainer : {
      backgroundColor : 'white', 
      width : "90%", 
      paddingTop:20, 
      borderRadius : 30, 
      borderWidth:3,
      maxHeight:"60%"
    },
    modalButton1 : {
      backgroundColor : 'white',
      borderRadius : 20,
      padding : 5,
      paddingHorizontal:10,
      borderWidth : 1,
      alignItems : 'center',
      justifyContent : 'center',
    },

    modalButton2 : {
        width : "100%",
        backgroundColor : '#5c7db4',
        borderRadius : 10,
        padding : 5,
        paddingHorizontal:10,
        borderWidth : 1,
        justifyContent : 'center',
        alignItems : 'center',

      },
    modalButtonContainer : {
      width:"100%",
      alignItems:'center',
      marginVertical : "5%",
      paddingHorizontal : "7%"
    },
    headerContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal : 30,
        marginBottom : "2%"
    },
    line: {
        height: 2,
        backgroundColor: 'darkgrey',
        marginHorizontal : "8%",
        marginBottom : "10%"
        // width, margin 등의 스타일을 조정하여 수평선의 모양을 변경할 수 있습니다.
      },
      selectedButton : {
        backgroundColor : '#5c7db4'
      },
      selectedText : {
        color : 'white'
      },
      buttonText : {
        fontSize : 22
      },
      articleCountText : {
        fontSize : 15,
        paddingHorizontal : 30,
        marginBottom : 30
      }
  });
  
  
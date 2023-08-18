import React, {useState, useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, View,ScrollView, TouchableWithoutFeedback} from 'react-native';
import SpotArticle from './Article';
import { MaterialIcons } from '@expo/vector-icons';


export default function ModalArticle({ArticleModalVisible,setArticleModalVisible,filteredList}) {
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
      <TouchableWithoutFeedback onPress={closeArticleModal}> 
        <View style={styles.articleModalContainer} onPress={closeArticleModal}>
          <TouchableWithoutFeedback onPress={()=>{}}>
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
            </TouchableWithoutFeedback>
        </View>
        </TouchableWithoutFeedback>
    </Modal>

    )
}

const styles = StyleSheet.create({
  articleModalContainer : {
      backgroundColor : 'rgba(0,0,0,0.3)',
      alignItems : 'center',
      justifyContent : 'center',
      flex : 1,
      width: '100%',
    },
    modalInnerContainer : {
      backgroundColor : 'white', 
      width : "90%", 
      paddingTop:20,
      padding :5, 
      borderRadius : 30, 
      // borderWidth:1,
      maxHeight:"60%"
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
        marginBottom : 10
      }
  });
  
  
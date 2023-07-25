import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';

export default function ModalFishCategory({CategoryModalVisible,setCategoryModalVisible}) {

    const closeCategoryModal = () => {
        setCategoryModalVisible(!CategoryModalVisible)
    }

    const Fishes = [
        {id : 1, name : '참돔'},
        {id : 2, name : '참돔'},
        {id : 3, name : '참돔'},
        {id : 4, name : '참돔'},
        {id : 5, name : '참돔'},
        {id : 6, name : '참돔'},
        {id : 7, name : '참돔'},
        {id : 8, name : '참돔'},
        {id : 9, name : '참돔'},
        {id : 10, name : '참돔'},
        {id : 11, name : '참돔'},
        {id : 12, name : '참돔'},
        {id : 13, name : '참돔'},
        {id : 14, name : '참돔'},
    ]

    const renderButtonRow = ({ item }) => (
        <View style={{width:"33%",justifyContent:'center', flexDirection:'row'}}>
            <View style={{backgroundColor:'red', marginVertical:10}}>
                <TouchableOpacity style={styles.modalButton2} onPress={closeCategoryModal}>
                    <Text style={{ fontSize: 20 }}>{item.name} </Text>
                </TouchableOpacity>
            </View>
        </View>
    )   

    return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={CategoryModalVisible}
        onRequestClose={() => {
            setCategoryModalVisible(!CategoryModalVisible);
        }
    }>
        <View style={styles.calendarContainer}>
            <View style={{backgroundColor : 'white', width : "90%", paddingTop:20, borderRadius : 30, borderWidth:3}}>
                <View style={styles.headerContainer}>
                    <Text style={{fontSize : 25}}>어종</Text>
                    <MaterialIcons name="close" size={35} color="black" />
                </View>

                <View style={styles.line}></View>

                {/* <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                    <TouchableOpacity style={styles.modalButton1} onPress={closeCategoryModal}>
                        <Text style={{fontSize:18}}>설정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton1} onPress={closeCategoryModal}>
                        <Text style={{fontSize:18}}>설정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton1} onPress={closeCategoryModal}>
                        <Text style={{fontSize:18}}>설정</Text>
                    </TouchableOpacity>
                </View> */}
                <View style={{justifyContent:'center', alignItems:'center'}}>
                    <FlatList
                        data={Fishes}
                        renderItem={renderButtonRow}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={3}
                    >
                    </FlatList>
                </View>
                
                
                <View style={styles.modalButtonContainer}>
                    <TouchableOpacity style={styles.modalButton2} onPress={closeCategoryModal}>
                    <Text style={{fontSize:18}}>설정</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor : 'red'
    },
    
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    modal : {
      backgroundColor : 'black',
      
    },
    calendar : {
      borderRadius : 30,
    },
    calendarContainer : {
      backgroundColor : 'transparent',
      alignItems : 'center',
      justifyContent : 'center',
      flex : 1,
      width: '100%',
    },
    modalButton1 : {
      backgroundColor : 'pink',
      borderRadius : 10,
      padding : 5,
      paddingHorizontal:10,
      borderWidth : 1,
    },
    modalButton2 : {
        // width : "80%",
        backgroundColor : 'pink',
        borderRadius : 10,
        padding : 5,
        paddingHorizontal:10,
        borderWidth : 1,
        justifyContent : 'center',
        alignItems : 'center'
  
      },
    modalButtonContainer : {
      width:"100%",
      flexDirection:'row', 
      justifyContent:'center',
      marginVertical : "5%"
    },
    headerContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal : 30
    },
    line: {
        height: 2,
        backgroundColor: 'darkgrey',
        marginHorizontal : "8%",
        marginBottom : "5%"
        // width, margin 등의 스타일을 조정하여 수평선의 모양을 변경할 수 있습니다.
      },
  });
  
  
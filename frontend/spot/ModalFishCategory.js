import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { Shadow } from 'react-native-shadow-2';

export default function ModalFishCategory({CategoryModalVisible,setCategoryModalVisible}) {

    const [selectedFishes,setSelectedFishes] = useState([])
    const addFish = (item) => {
        if (selectedFishes.includes(item)) {
            // 이미 선택된 어종인 경우 선택 해제
            setSelectedFishes((prev) => prev.filter((id) => id !== item));
            } else {
            // 선택되지 않은 어종인 경우 추가
            setSelectedFishes((prev) => [...prev, item]);
            }
    }

    const ClickSetting = () => {
        // console.log(selectedFishes)
        setSelectedFishes([])
        setCategoryModalVisible(false)
    }

    const closeCategoryModal = () => {
        setSelectedFishes([])
        setCategoryModalVisible(false)
    }

    const Fishes = [
        {id : 1, name : '감성돔'},
        {id : 2, name : '고등어'},
        {id : 3, name : '돌돔'},
        {id : 4, name : '참치'},
        {id : 5, name : '광어'},
        {id : 6, name : '상어'},
        {id : 7, name : '돌고래'},
        {id : 8, name : '갈치'},
        {id : 9, name : '날치'},
        {id : 10, name : '연어'},
        {id : 11, name : '우럭'},
        {id : 12, name : '망둥어'},
        {id : 13, name : '한치'},
        {id : 14, name : '참돔'},
    ]


    const renderButtonRow = ({ item }) => {
        const isSelected = selectedFishes && selectedFishes.includes(item.id);

        return (
            <View style={{width:"33%",justifyContent:'space-around', flexDirection:'row'}}>
                <View style={{width : "90%", marginVertical:10}}>
                    <Shadow style={{width : "100%"}} offset={[3,4]} distance={3}>
                    <TouchableOpacity style={[styles.modalButton1, isSelected && styles.selectedButton]} onPress={() => addFish(item.id)}>
                        <Text style={[styles.buttonText,isSelected&&styles.selectedText]}>{item.name} </Text>
                    </TouchableOpacity>
                    </Shadow>
                </View>
            </View>
        )
    }   

    return (
    
        <Modal
            animationType="fade"
            transparent={true}
            visible={CategoryModalVisible}
            onRequestClose={() => {
                setCategoryModalVisible(!CategoryModalVisible);
            }
        }>  
            <TouchableWithoutFeedback onPress={closeCategoryModal}>
            <View style={styles.categoryContainer} onPress={closeCategoryModal}>
                <View style={{backgroundColor : 'white', width : "90%", paddingTop:20, borderRadius : 30, borderWidth:3}}>
                    <View style={styles.headerContainer}>
                        <Text style={{fontSize : 30, fontWeight : "600"}}>어종</Text>
                        <MaterialIcons name="close" size={40} color="black" onPress={closeCategoryModal} />
                    </View>

                    <View style={styles.line}></View>

                    <View style={{paddingHorizontal : "5%",justifyContent:'center', alignItems:'center'}}>
                        <FlatList
                            data={Fishes}
                            renderItem={renderButtonRow}
                            keyExtractor={(item) => item.id.toString()}
                            numColumns={3}
                        >
                        </FlatList>
                    </View>
                    
                    
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={styles.modalButton2} onPress={ClickSetting}>
                        <Text style={{fontSize:25, fontWeight:"600", color:'white'}}>확인</Text>
                        </TouchableOpacity>
                    </View>
                
                </View>
            </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    categoryContainer : {
        backgroundColor : 'rgba(0, 0, 0, 0.3)',
        alignItems : 'center',
        justifyContent : 'center',
        flex : 1,
        width: '100%',
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
        marginBottom : "5%"
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
      }
  });
  
  
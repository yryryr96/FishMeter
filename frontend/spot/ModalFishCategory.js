import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { useRecoilValue } from 'recoil';
import { filteredDatas } from '../component/recoil/selectors/testSelector';
const DATA = [
    {
        id: 0,
        title: "쥐노래미",
        state: true,
        src1: require("../assets/fishes/movefishes/test1.gif"),
        src2: require("../assets/fishes/two.png"),
    },
    {
        id: 1,
        title: "감성돔",
        state: true,
        src1: require("../assets/fishes/movefishes/test3.gif"),
        src2: require("../assets/fishes/three.png"),
    },
    {
        id: 2,
        title: "말쥐치",
        state: false,
        src1: require("../assets/fishes/movefishes/test8.gif"),
        src2: require("../assets/fishes/eight.png"),
    },
    {
        id: 3,
        title: "돌돔",
        state: false,
        src1: require("../assets/fishes/movefishes/test7.gif"),
        src2: require("../assets/fishes/seven.png"),
    },
    {
        id: 4,
        state: false,
        title: "쏘가리",
        src1: require("../assets/fishes/movefishes/test1.gif"),
        src2: require("../assets/fishes/one.png"),
    },
    {
        id: 5,
        title: "참돔",
        state: false,
        src1: require("../assets/fishes/movefishes/test5.gif"),
        src2: require("../assets/fishes/five.png"),
    },
    {
        id: 6,
        title: "옥돔",
        state: false,
        src1: require("../assets/fishes/movefishes/test4.gif"),
        src2: require("../assets/fishes/four.png"),
    },

    {
        id: 7,
        title: "송어",
        state: true,
        src1: require("../assets/fishes/movefishes/test6.gif"),
        src2: require("../assets/fishes/six.png"),
    },
];

export default function ModalFishCategory({setTotalMarker,CategoryModalVisible,setCategoryModalVisible}) {

    const [selectedFishes,setSelectedFishes] = useState([])
    const filteredData = useRecoilValue(filteredDatas(selectedFishes))
    const addFish = (item) => {
        if (selectedFishes.includes(item)) {
            // 이미 선택된 어종인 경우 선택 해제
            setSelectedFishes((prev) => prev.filter((name) => name !== item));
        } else {
            // 선택되지 않은 어종인 경우 추가
            setSelectedFishes((prev) => [...prev, item]);
        }
    }

    const ClickSetting = () => {
        setTotalMarker(filteredData)
        setSelectedFishes([])
        setCategoryModalVisible(false)
    }

    const closeCategoryModal = () => {
        setSelectedFishes([])
        setCategoryModalVisible(false)
    }

    const renderButtonRow = ({ item }) => {
        const isSelected = selectedFishes && selectedFishes.includes(item.title);

        return (
            <View style={{width:"33%",justifyContent:'space-around', flexDirection:'row'}}>
                <View style={{width : "90%", marginVertical:10}}>
                    <Shadow style={{width : "100%"}} offset={[3,4]} distance={3}>
                    <TouchableOpacity style={[styles.modalButton1, isSelected && styles.selectedButton]} onPress={() => addFish(item.title)}>
                        <Text style={[styles.buttonText,isSelected&&styles.selectedText]}>{item.title} </Text>
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
                <TouchableWithoutFeedback onPress={()=>{}}>
                <View style={styles.categoryInnerContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={{fontSize : 30, fontWeight : "600"}}>어종</Text>
                        <MaterialIcons name="close" size={40} color="black" onPress={closeCategoryModal} />
                    </View>

                    <View style={styles.line}></View>

                    <View style={{paddingHorizontal : "5%",justifyContent:'center', alignItems:'center'}}>
                        <FlatList
                            data={DATA}
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
                </TouchableWithoutFeedback>
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
    categoryInnerContainer : {
        backgroundColor : 'white', 
        width : "90%", 
        paddingTop:20, 
        borderRadius : 30, 
        borderWidth:1   
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
        justifyContent : 'center',
        alignItems : 'center',

        },
    modalButtonContainer : {
        width:"100%",
        alignItems:'center',
        marginVertical : "5%",
        paddingHorizontal : "7%",

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
        fontSize : 20
      }
  });
  
  
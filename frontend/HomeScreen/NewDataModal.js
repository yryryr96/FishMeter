import {Alert, Modal, StyleSheet, Text, View,ScrollView, Image, TouchableWithoutFeedback} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function NewDataModal({newDataModalVisible, setNewDataModalVisible, newData}) {
    // console.log(newData)
    const closeNewDataModal = () => {
        setNewDataModalVisible(false)
    }
    
    const reversedNewData = newData.slice().reverse()
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={newDataModalVisible}
            onRequestClose={() => {
                setNewDataModalVisible(false);
            }
        }>  
            <View style={styles.ModalOuterContainer} onPress={closeNewDataModal}>
                <View style={styles.modalInnerContainer}>
                    
                    <View style={styles.headerContainer}>
                        <Text style={{fontSize : 30, fontWeight : "600"}}>알림</Text>
                        <MaterialIcons name="close" size={40} color="black" onPress={closeNewDataModal} />
                    </View>

                    
                    <View>
                        <Text style={{marginHorizontal : 30}}>{newData?.length}개의 알림</Text>
                    </View>
                    
                    <ScrollView>
                    
                    <View style={{width:"100%", padding:18}}>
                        {reversedNewData.map((item,index) => (
                            <View key={index}>
                                <View style={{flexDirection:'row'}}>
                                    <View>
                                        <Image source={{uri : item.src1}} style={{width:120,height:120,borderRadius : 10}} />
                                    </View>

                                    <View style={{marginHorizontal : 22, justifyContent : 'space-between'}}>
                                        <Text style={{fontSize : 13, marginBottom:5}}>{item.address}</Text>
                                        <Text style={{fontSize : 16, marginBottom:5}}>{item.id}</Text>
                                        <Text style={{fontSize : 16, marginBottom:5}}>{item.title}</Text>
                                        <Text style={{fontSize : 16, marginBottom:5}}>{item.size}cm</Text>
                                    </View>
                                </View>
                                <View style={{borderWidth:1, borderColor:'grey', margin : 15}}></View>
                            </View>
                        ))}
                    </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    ModalOuterContainer : {
        backgroundColor : 'transparent',
        alignItems : 'center',
        justifyContent : 'center',
        flex : 1,
        width: '100%',
    },
    modalInnerContainer : {
        backgroundColor : 'rgba(255, 255, 255, 1)', 
        width : "90%", 
        paddingTop:20, 
        borderRadius : 30, 
        borderWidth:3,
        maxHeight:"60%",
        opacity:0.8
    },
    
    headerContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal : 30,
        marginBottom : "2%"
    },
});
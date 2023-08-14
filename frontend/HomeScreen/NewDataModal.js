import {Alert, Modal, StyleSheet, Text, View,ScrollView, Image, TouchableWithoutFeedback} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function NewDataModal({newDataModalVisible, setNewDataModalVisible, newData, setNewData}) {
    // console.log(newData)
    const closeNewDataModal = () => {
        setNewDataModalVisible(false)
        setNewData([])
    }
    
    const reversedNewData = newData.slice().reverse()
    return (
        
        <Modal
            animationType="fade"
            transparent={true}
            visible={newDataModalVisible}
            onRequestClose={closeNewDataModal}
            >  
            <TouchableWithoutFeedback onPress={closeNewDataModal}>
            <View style={styles.ModalOuterContainer} onPress={closeNewDataModal}>
                <TouchableWithoutFeedback onPress={()=>{}}>
                <View style={styles.modalInnerContainer}>
                    
                    <View style={styles.headerContainer}>
                        <Text style={{fontSize : 30, fontWeight : "600"}}>알림</Text>
                        <MaterialIcons name="close" size={40} color="black" onPress={closeNewDataModal} />
                    </View>

                    
                    <View style={{marginVertical : 3}}>
                        <Text style={{marginHorizontal : 30}}>{newData?.length}개의 알림</Text>
                    </View>
                    
                    <ScrollView>
                    
                    <View style={{width:"100%", padding:18}}>
                        {reversedNewData.map((item,index) => (
                            <View key={index}>
                                <View style={{flexDirection:'row'}}>
                                    <View>
                                        <Image source={{uri : item.imageUrl}} style={{width:120,height:120,borderRadius : 10}} resizeMode='contain'/>
                                    </View>

                                    <View style={{marginHorizontal : 7, justifyContent : 'space-between'}}>
                                        <Text style={{fontSize : 13, marginBottom:5}}>{item.address}</Text>
                                        <Text style={{fontSize : 16, marginBottom:5}}>{item.nickName}</Text>
                                        <Text style={{fontSize : 16, marginBottom:5}}>{item.species}</Text>
                                        <Text style={{fontSize : 16, marginBottom:5}}>{item['length']}cm</Text>
                                    </View>
                                </View>
                                <View style={{borderWidth:1, borderColor:'grey', margin : 15}}></View>
                            </View>
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
    ModalOuterContainer : {
        backgroundColor : 'rgba(0,0,0,0.5)',
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
        borderWidth: 2,
        maxHeight:"60%",
        // opacity:0.8
    },
    
    headerContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal : 30,
        marginBottom : "2%"
    },
});
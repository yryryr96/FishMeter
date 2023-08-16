import {Alert, Modal, StyleSheet, Text, View,ScrollView, Image, TouchableWithoutFeedback} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import HourlyWeather from '../spot/Weathers';

export default function ClickedMarkerModal({ClickedModalVisible, setClickedModalVisible, item}) {
    // console.log(item)
    const closeClickedModalVisible = () => {
        setClickedModalVisible(false)
    }
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={ClickedModalVisible}
            onRequestClose={() => {
                setClickedModalVisible(false);
            }
        }>  
            <View style={styles.modalOuterContainer} onPress={closeClickedModalVisible}>                
                <ScrollView style={styles.modalInnerContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={{fontSize : 30, fontWeight : "600"}}>상세 정보</Text>
                        <MaterialIcons name="close" size={40} color="black" onPress={closeClickedModalVisible} />
                    </View>
                    
                    <View style={{width:"100%", padding:18}}>
                        <View>
                            <View>
                                <Image source={{uri : item?.imageUrl}} style={{width:"100%",height:300,borderRadius : 10}} resizeMode='contain' />
                            </View>
                            
                            <View>
                                <HourlyWeather latitude={item?.latitude} longitude={item?.longitude}/>
                            </View>
                            
                            <View style={{justifyContent:'space-between',marginTop:20, marginLeft : 15 }}>
                                <Text style={{fontSize : 16, marginBottom:5}}>주소 : {item?.address}</Text>
                                <Text style={{fontSize : 16, marginBottom:5}}>닉네임 : {item?.nickname}</Text>
                                <Text style={{fontSize : 16, marginBottom:5}}>어종 : {item?.species}</Text>
                                <Text style={{fontSize : 16, marginBottom:5}}>크기 : {item?.length}cm</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOuterContainer :{
        backgroundColor : 'rgba(0,0,0,0.3)',
        alignItems : 'center',
        justifyContent : 'center',
        flex : 2,
        width: '100%',
    },
    modalInnerContainer : {
        backgroundColor : 'white', 
        width : "90%", 
        paddingTop:20, 
        borderRadius : 30, 
        borderWidth:1,
        maxHeight : "73%"
    },
    headerContainer : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingHorizontal : 30,
        marginBottom : "2%",
    },
});
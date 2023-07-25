import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity} from 'react-native';
import CalendarPicker from "react-native-calendar-picker";

export default function ModalTest() {

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const clickOk = () => {
    setModalVisible(!modalVisible)
    console.log(selectedStartDate.toISOString().substring(0, 10))
    console.log(selectedEndDate.toISOString().substring(0, 10))
  }

  const onDateChange = (date, type) => {
    //function to handle the date changer
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  };
  return (
    <View style={styles.centeredView}>
        <Text style={{backgroundColor:'black'}}>MODDDDDDDDDDDDDDDDD</Text>
        <Modal
        style={{backgroundColor : 'yellow'}}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}>
          <View style={styles.calendarContainer}>
            <View style={{backgroundColor : 'white', alignItems : 'center', width : "80%", borderRadius : 30}}>
              <CalendarPicker
                
                startFromMonday={false}
                dayLabelsWrapper={{
                  style: { width: "50%", height: 30, alignItems: 'center' } // 버튼을 감싸는 View 컴포넌트의 스타일 조정
                }}
                allowRangeSelection={true}
                minDate={new Date(2010, 1, 1)}
                maxDate={new Date(2050, 6, 3)}
                weekdays={["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]}
                months={[
                  "1월",
                  "2월",
                  "3월",
                  "4월",
                  "5월",
                  "6월",
                  "7월",
                  "8월",
                  "9월",
                  "10월",
                  "11월",
                  "12월"
                ]}
                previousTitle="이전"
                nextTitle="다음"
                
                todayBackgroundColor="pink"
                selectedDayColor="pink"
                selectedDayTextColor="#000000"
                scaleFactor={450}
                textStyle={{
                  color: "#000000"
                }}
                onDateChange={onDateChange}
              />
              
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={clickOk}>
                  <Text style={{fontSize:18}}>설정</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.modalButton} onPress={()=>setModalVisible(!modalVisible)}>
                  <Text style={{fontSize:18}}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
    </View>
    );    
};

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
    backgroundColor : 'yellow',
    alignItems : 'center',
    justifyContent : 'center',
    flex : 1,
    width: '100%',
  },
  modalButton : {
    backgroundColor : 'pink',
    borderRadius : 10,
    padding : 5,
    borderColor : 'black',
    borderWidth : 1
  },
  modalButtonContainer : {
    paddingVertical:"5%",
    paddingHorizontal:'30%', 
    width:"100%",
    flexDirection:'row', 
    justifyContent:'space-between'
  }
});


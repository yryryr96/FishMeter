import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View,TouchableWithoutFeedback } from 'react-native';
import CalendarPicker from "react-native-calendar-picker";
import { AntDesign } from '@expo/vector-icons';
// import { TouchableWithoutFeedback } from 'react-native-web';

export default function CalendarModal({calendarModalVisible,setCalendarModalVisible}) {
  // const [modalVisible, setModalVisible] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const closeCalendarModal = () => {
    setCalendarModalVisible(!calendarModalVisible)
    if (selectedStartDate && selectedStartDate) {
      console.log(selectedStartDate.toISOString().substring(0, 10))
      console.log(selectedEndDate.toISOString().substring(0, 10))
    }
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={calendarModalVisible}
        onRequestClose={() => {
          setCalendarModalVisible(!calendarModalVisible);
        }}>
        
        <TouchableWithoutFeedback onPress={closeCalendarModal}>
          <View style={styles.calendarContainer}>
            <View style={{backgroundColor : 'white', width : "90%", paddingTop:20, borderRadius : 30, borderWidth:3}}>
              <CalendarPicker
                startFromMonday={false}
                dayLabelsWrapper={{
                  style: { width: "50%", height: 30, alignItems: 'center' } // 버튼을 감싸는 View 컴포넌트의 스타일 조정
                }}
                allowRangeSelection={true}
                minDate={new Date(2019, 1, 1)}
                maxDate={new Date(2024, 6, 3)}
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
                previousTitle={<AntDesign name="left" size={24} color="black" />}
                nextTitle={<AntDesign name="right" size={24} color="black" />}
                selectYearTitle='연도를 선택해주세요'
                selectMonthTitle=''
                monthYearHeaderWrapperStyle={{flexDirection: 'row-reverse'}}
                monthTitleStyle={{fontSize: 24, fontWeight: "400"}}
                yearTitleStyle={{fontSize: 24, fontWeight: "400"}}
                allowBackwardRangeSelect
                todayBackgroundColor="pink"
                selectedDayColor="pink"
                selectedDayTextColor="#000000"
                headerWrapperStyle = {{width:"80%", justifyContent : 'space-between'}}
                scaleFactor={400}
                textStyle={{
                  color: "#000000"
                }}
                onDateChange={onDateChange}
                
              />
              
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity style={styles.modalButton} onPress={closeCalendarModal}>
                  <Text style={{fontSize:18}}>설정</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.modalButton} onPress={()=>setCalendarModalVisible(!calendarModalVisible)}>
                  <Text style={{fontSize:18}}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
  );
}

const styles = StyleSheet.create({

  calendarContainer : {
    backgroundColor : 'transparent',
    alignItems : 'center',
    justifyContent : 'center',
    flex : 1,
    width: '100%',
  },
  modalButton : {
    backgroundColor : 'pink',
    borderRadius : 10,
    padding : 5,
    paddingHorizontal:10,
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


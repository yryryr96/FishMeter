import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import { Calendar } from "react-native-calendars";

export default function ModalTest() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState('');

  return (
    <View style={styles.centeredView}>
        <Text>MODDDDDDDDDDDDDDDDD</Text>
        <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}>
        {/* <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
            </View>
        </View> */}
        <Calendar
            // style={{ opacity: 0.8, backgroundColor: 'transparent' }}
            theme={{
              calendarBackground: 'transparent',
              textSectionTitleColor: 'black',
              selectedDayBackgroundColor: 'orange',
              selectedDayTextColor: 'white',
              todayTextColor: 'black',
              dayTextColor: 'black',
              textDisabledColor: 'grey',
              dotColor: 'orange',
              selectedDotColor: 'white',
              arrowColor: 'black',
              monthTextColor: 'black',
              indicatorColor: 'black',
              weekendTextColor: 'blue'
            }}
            onDayPress={day => {
                setSelected(day.dateString);
            }}
            markedDates={{
                [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
            }}
        />
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
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
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
});


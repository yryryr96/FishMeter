import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarModal({ modalVisible, closeCalendarModal }) {
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  // Helper function to get all dates between the start and end dates
  const getRangeDates = (start, end) => {
    const dates = {};
    const currentDate = new Date(start);
    while (currentDate <= new Date(end)) {
      const dateString = currentDate.toISOString().split('T')[0];
      dates[dateString] = { selected: true, disableTouchEvent: true, selectedDotColor: 'orange' };
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        closeCalendarModal();
      }}
    >
      <View style={styles.calendarContainer}>
        <View style={{ backgroundColor: 'white', alignItems: 'center', width: '80%', borderRadius: 30 }}>
          <Calendar
            horizontal={true}
            style={styles.calendar}
            theme={{
              calendarBackground: 'transparent',
              textSectionTitleColor: 'black',
              selectedDayBackgroundColor: 'orange',
              selectedDayTextColor: 'white',
              todayTextColor: 'skyblue',
              dayTextColor: 'black',
              textDisabledColor: 'grey',
              dotColor: 'orange',
              selectedDotColor: 'white',
              arrowColor: 'black',
              monthTextColor: 'black',
              indicatorColor: 'black',
              dotStyle: 'sqaure'
            }}
            onDayPress={(day) => {
              if (selectedStartDate && !selectedEndDate) {
                if (new Date(day.dateString) < new Date(selectedStartDate)) {
                  // Swap the dates if the end date is earlier than the start date
                  setSelectedEndDate(selectedStartDate);
                  setSelectedStartDate(day.dateString);
                } else {
                  setSelectedEndDate(day.dateString);
                }
              } else {
                setSelectedStartDate(day.dateString);
                setSelectedEndDate('');
              }
            }}
            markedDates={
              selectedStartDate && selectedEndDate
                ? getRangeDates(selectedStartDate, selectedEndDate)
                : {
                    [selectedStartDate]: {
                      selected: true,
                      disableTouchEvent: true,
                      selectedDotColor: 'orange',
                    },
                  }
            }
          />

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.modalButton} onPress={closeCalendarModal}>
              <Text style={{ fontSize: 18 }}>설정</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={closeCalendarModal}>
              <Text style={{ fontSize: 18 }}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  calendarContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  calendar: {
    borderRadius: 30,
  },
  modalButton: {
    backgroundColor: 'pink',
    borderRadius: 10,
    padding: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  modalButtonContainer: {
    paddingVertical: '5%',
    paddingHorizontal: '30%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

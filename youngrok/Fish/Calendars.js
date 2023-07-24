import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { StyleSheet } from "react-native";

export default function Calendars() {
  const [selected, setSelected] = useState('');
  return (
    <Calendar
      onDayPress={day => {
        setSelected(day.dateString);
      }}
      markedDates={{
        [selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
});

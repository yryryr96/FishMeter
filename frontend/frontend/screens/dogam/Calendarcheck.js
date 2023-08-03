import React, { useState, useEffect } from "react";
import CalendarPicker from "react-native-calendar-picker";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Modal,
} from "react-native";

const Date = [
  "2023-07-01",
  "2023-07-05",
  "2023-07-10",
  "2023-08-20",
  "2023-08-10",
  "2023-08-05",
  "2023-08-01",
];

function Calendarcheck({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null); // 추가

  // 날짜 클릭하면 갤러리로 넘어가도록
  useEffect(() => {
    if (selectedStartDate) {
      // 변경: selectedDate -> selectedStartDate
      const [year, month, day] = selectedStartDate.split("-");
      navigation.navigate("CalendarGallery", {
        year,
        month,
        day,
      });
    }
  }, [selectedStartDate, navigation]); // 변경: selectedDate -> selectedStartDate

  const handleDatePress = (date) => {
    if (Date.includes(date.format("YYYY-MM-DD").toString())) {
      // 수정
      setSelectedDate(date.format("YYYY-MM-DD").toString()); // 수정
      setSelectedStartDate(date.format("YYYY-MM-DD").toString()); // 수정
      console.log(date);
    } else {
      setSelectedDate(null);
      setSelectedStartDate(null); // 추가
      Alert.alert("알림", "이날 등록된 사진이 없어요!");
    }
  };

  const getCustomStyles = (date) => {
    const dateString = date.format("YYYY-MM-DD").toString(); // 수정
    const customStyle = Date.includes(dateString)
      ? {
          container: {
            backgroundColor: "blue",
          },
          text: {
            color: "white",
          },
        }
      : {};
    return customStyle;
  };

  return (
    <>
      <CalendarPicker
        onDateChange={handleDatePress}
        selectedStartDate={selectedStartDate} // 변경: selectedDate -> selectedStartDate
        todayBackgroundColor="red"
        todayTextStyle={{ color: "#fff" }}
        customDatesStyles={getCustomStyles}
      />
      {selectedDate && <Text>선택한 날짜: {selectedDate}</Text>}
    </>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
});

export default Calendarcheck;

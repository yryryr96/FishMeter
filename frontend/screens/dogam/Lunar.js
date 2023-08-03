import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import holidayKr from "holiday-kr";

const Lunar = () => {
  const [inputDate, setInputDate] = useState("");
  const [lunarDate, setLunarDate] = useState("");
  const [water, setWater] = useState("");

  const handleConvertDate = () => {
    if (!inputDate) {
      console.error("양력 날짜를 입력해주세요.");
      return;
    }

    try {
      const [year, month, day] = inputDate.split("-").map(Number);
      const lunarDateObj = holidayKr.getLunar(year, month, day);
      const convertedDate = `${lunarDateObj.year}-${lunarDateObj.month}-${lunarDateObj.day}`;
      setLunarDate(convertedDate);
      checkWater(lunarDateObj.day);
    } catch (error) {
      console.error("유효하지 않은 날짜 형식입니다.", error);
      setLunarDate("");
    }
  };

  const checkWater = (day) => {
    console.log(day);
    let a = day + 6 + 1;
    console.log(a);
    if (a > 15) {
      if (a > 30) {
        a -= 30;
      } else {
        a -= 15;
      }
    }
    //console.log(a);
    setWater(a);
  };

  return (
    <View>
      <Text>양력 날짜를 음력 날짜로 변환</Text>
      <TextInput
        value={inputDate}
        onChangeText={(text) => setInputDate(text)}
        placeholder="양력 날짜 입력 (예: 2023-08-02)"
      />
      <Button title="변환하기" onPress={handleConvertDate} />
      <Text>음력 날짜: {lunarDate}</Text>
      <Text>물때 : {water}</Text>
    </View>
  );
};

export default Lunar;

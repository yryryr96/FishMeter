import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import useCustomFont from "../../font/useCustomFont";
import holidayKr from "holiday-kr";

function FontText({ fontFileName, children }) {
  const isFontLoaded = useCustomFont(fontFileName);

  if (!isFontLoaded) {
    return null;
  }

  return <Text style={styles.text}>{children}</Text>;
}

const Lunar = ({ solardate }) => {
  const [inputDate, setInputDate] = useState("");
  const [lunarDate, setLunarDate] = useState("");
  const [water, setWater] = useState("");

  useEffect(() => {
    handleConvertDate(solardate);
    console.log(solardate);
  }, []);

  const handleConvertDate = (inputDate) => {
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
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 80 }}>
          <FontText
            fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
          >
            <Text>음력 날짜: </Text>
          </FontText>
        </View>
        <View>
          <FontText
            fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
          >
            <Text>{lunarDate}</Text>
          </FontText>
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: 80 }}>
          <FontText
            fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
          >
            <Text>물때 : </Text>
          </FontText>
        </View>
        <View>
          <FontText
            fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
          >
            <Text>{water}물</Text>
          </FontText>
        </View>
      </View>
    </View>
  );
};

export default Lunar;

const styles = StyleSheet.create({
  text: {
    fontFamily: "customFont",
    fontSize: 18,
  },
});
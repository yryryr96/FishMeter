import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Button,
} from "react-native";
import moment from "moment"; //날짜가져오기
import "moment/locale/ko"; // 한국어 로케일 추가
import { Fontisto } from "@expo/vector-icons";

const API_KEY = "a4584503e26d989774c0c7a0a2abdb61";
const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};
export default function HourlyWeather({latitude, longitude}) {
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const date = moment().format("YYYY-MM-DD");
  const [curweather, setCurweather] = useState([]);

  const getWeather = async () => {
    //3시간 간격만 무료
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&lang=kr&units=metric`
    );
    const json = await response.json();
    setDays(json.list.filter((item) => item.dt_txt));
  };
  useEffect(() => {
    getWeather();
  }, []);

  const renderHourlyWeather = () => {
    if (days.length === 0) {
      // curweather 상태가 비어있는 경우 로딩 상태 또는 데이터가 없음을 표시
      return (
        <View style={styles.weatherbox}>
          <ActivityIndicator size="large" color="#5c7db4" />
        </View>
      );
    }
    return (
      <View style={[styles.weatherbox]}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {days.map((weather, index) => {
            moment.locale("ko");
            const time = moment(weather.dt_txt).format("HH");
            const date = moment(weather.dt_txt).format("YYYY-MM-DD");
            const Date = moment(date).format("dddd");

            const temperature = parseFloat(weather.main.temp).toFixed(0);
            const description = weather.weather[0].description;
            const icon = weather.weather[0].main;

            return (
              <View key={index} style={[styles.hourlyItem, { marginLeft: 10 }]}>
                <Text style={styles.time}>{Date}</Text>
                <Text style={styles.time}>{time}시</Text>
                <Fontisto name={icons[icon]} size={20} padding={5} />
                <Text style={styles.temperature}>{temperature}°C</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return renderHourlyWeather()
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
  },
  hourlyItem: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  time: {
    fontSize: 8,
    fontWeight: "bold",
  },
  temperature: {
    fontSize: 8,
    fontWeight: "bold",
  },
  description: {
    fontSize: 12,
  },
  tinytext: {
    fontSize: 8,
  },
  weatherElement: {
    margin: 5,
  },
  weatherbox: {
    flex: 1,
    height: "30%",
    borderRadius: 20,
    backgroundColor: "#fff",
    // overflow: "hidden",
    // marginLeft : "-4%"
  },
});

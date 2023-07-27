import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import "moment/locale/ko";
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
const HourlyWeather = () => {
  const profile = () => console.log("profile");
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const date = moment().format("YYYY-MM-DD");

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 6 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].region);
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
    return (
      <View>
        <View style={styles.head}>
          <Text style={styles.city}>{city}</Text>
          <TouchableOpacity onPress={profile}>
            <Image
              source={require("./assets/Group.png")}
              style={styles.image}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.weatherS}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {days.map((weather, index) => {
            moment.locale("ko");
            const time = moment(weather.dt_txt).format("HH:mm");
            const date = moment(weather.dt_txt).format("YYYY-MM-DD");
            const Date = moment(date).format("dddd");
            const temperature = parseFloat(weather.main.temp).toFixed(1);
            const icon = weather.weather[0].main;
            const max_temp = parseFloat(weather.main.temp_max).toFixed(0);
            const min_temp = parseFloat(weather.main.temp_min).toFixed(0);

            return (
              <View key={index} style={styles.hourlyItem}>
                <Text style={styles.time}>{time}</Text>
                <Text style={styles.time}>{Date}</Text>
                <Fontisto
                  name={icons[icon]}
                  size={20}
                  color="grey"
                  padding={5}
                />
                <Text style={styles.temperature}>{temperature}°C</Text>
                <Text style={styles.tinytext}>
                  {max_temp}°C/{min_temp}°C
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.weatherContainer}>{renderHourlyWeather()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#B6CEE2",
    padding: 16,
  },
  hourlyItem: {
    alignItems: "center",
    borderColor: "#B6CEE2",
    marginTop: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  time: {
    fontSize: 10,
    fontWeight: "bold",
  },
  temperature: {
    fontSize: 12,
    color: "gray",
  },
  description: {
    fontSize: 12,
    color: "gray",
  },
  weatherS: {
    marginTop: 15,
    height: "90%",
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "white",
    backgroundColor: "#F3F8FB",
  },
  tinytext: {
    fontSize: 8,
    color: "gray",
  },
  weatherContainer: {
    marginTop: 10,
    flex: 0.21,
  },
  head: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  image: {
    flex: 1, // 이미지가 가로 방향으로 컨테이너의 30%의 공간을 차지하도록 설정
    aspectRatio: 1, // 이미지의 가로:세로 비율을 1:1로 유지
    resizeMode: "contain",
  },

  city: {
    flex: 0.3, // 도시 이름이 가로 방향으로 컨테이너의 20%의 공간을 차지하도록 설정
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HourlyWeather;

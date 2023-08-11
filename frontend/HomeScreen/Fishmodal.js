import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
} from "date-fns";
import moment from "moment"; //날짜가져오기
import "moment/locale/ko"; // 한국어 로케일 추가
import * as Location from "expo-location";
import holidayKr from "holiday-kr";

export default function Fishmodal({
  data,
  fishModalVisible,
  setfishModalVisible,
}) {
  const [selectedFish, setSelectedFish] = useState(data.category);
  const [size, setSize] = useState();
  const savefish = () => {
    setfishModalVisible(false);
    axios({
      //나중에 구현
      url: "/records",
      method: "POST",
      data: {
        recordRequestDto: {
          length: data.length,
          latitude: defaultLat,
          longitude: defaultLon,
          fishId: fishid[selectedFish],
        },

        image: data.imageArray,
      },
    });
    console.log(data.length);
    console.log(defaultLat);
    console.log(defaultLon);
    console.log(fishid[selectedFish]);
  };
  const fishid = {
    쥐노래미: 0,
    감성돔: 1,
    말쥐치: 2,
    돌돔: 3,
    쏘가리: 4,
    참돔: 5,
    옥돔: 6,
    송어: 7,
  };
  const closefishModalVisible = () => {
    setfishModalVisible(false);
  };
  const fishlist = [
    "쏘가리",
    "쥐노래미",
    "감성돔",
    "옥돔",
    "참돔",
    "송어",
    "돌돔",
    "말쥐치",
  ];
  const solardate = moment().format("YYYY-MM-DD");
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

  const [defaultLat, setDefaultLat] = useState(37.541);
  const [defaultLon, setdefaultLon] = useState(126.986);
  const getLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();

    if (defaultLon !== longitude && defaultLat !== latitude) {
      setDefaultLat(longitude);
      setdefaultLon(latitude);
    }
  };
  useEffect(() => {
    getLocation();
    if (data.category) {
      setSelectedFish(data.category);
    }
  }, [data.category]);

  return (
    <Modal
      style={styles.container}
      visible={fishModalVisible}
      onRequestClose={() => {
        setfishModalVisible(false);
      }}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${data.imageArray}` }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>날짜 :</Text>
          <Text style={styles.field}>{solardate}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>어종 :</Text>
          <Picker
            style={{ width: "100%" }}
            selectedValue={selectedFish}
            onValueChange={(itemValue, index) => setSelectedFish(itemValue)}
          >
            <Picker.Item label="선택하세요" value="" />
            {fishlist.map((fish, index) => (
              <Picker.Item key={index} label={fish} value={fish} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>위치 :</Text>
          <Text style={styles.field}>
            {defaultLat}
            {defaultLon}
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>물때 :</Text>
          <Text style={styles.field}>{water}물</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>사이즈:</Text>
          <TextInput
            style={styles.input}
            defaultValue={`${data.length}`}
            keyboardType="numeric"
            value={size}
            onChangeText={(text) => setSize(text)}
            onBlur={() => {
              // 입력이 완료되면 사용자가 입력한 값을 data.length에 반영
              data.length = parseInt(size); // 입력값을 정수로 변환하여 data.length에 대입
            }}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.saveButton]}
          onPress={savefish}
        >
          <Text style={styles.buttonText}>저장</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={closefishModalVisible}
        >
          <Text style={styles.buttonText}>취소</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: "#ffffff",
    flex: 0.4,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    backgroundColor: "#ffffff",
    flex: 0.6,
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 20,
    //borderTopWidth: 1,
    //borderTopColor: "#dee2e6",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    color: "#212529",
  },
  label: {
    width: "20%",
    fontSize: 20,
    color: "#495057",
  },
  field: {
    fontSize: 18,
    color: "#495057",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginLeft: 10,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: "5%",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  saveButton: {
    backgroundColor: "#ffffff",
    borderColor: "#007bff",
    borderWidth: 1,
  },
  cancelButton: {
    backgroundColor: "#ffffff",
    borderColor: "#dc3545",
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212529",
  },
});

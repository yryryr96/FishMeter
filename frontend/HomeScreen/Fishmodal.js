import { StatusBar } from "expo-status-bar";
import { useState, useEffect,useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import moment from "moment"; //날짜가져오기
import "moment/locale/ko"; // 한국어 로케일 추가
import * as Location from "expo-location";
import holidayKr from "holiday-kr";
import { SafeAreaView } from "react-native-safe-area-context";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import useCustomFont from "../font/useCustomFont";
import { useRecoilState } from "recoil";
import { myLocation, userId } from "../component/recoil/selectors/testSelector";
import { encode } from "base-64";
import { useNavigation } from "@react-navigation/native";

const GoogleMap = ({ latitude, longitude, setAddress }) => {
  useEffect(() => {
    // Nominatim API를 사용하여 주소 정보를 가져오는 함수를 정의합니다.

    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        // 위치 권한이 허용된 경우 주소 정보를 가져옵니다.r
        fetchAddress();
      } else {
        // 위치 권한이 거부된 경우 처리할 로직을 추가합니다.
        console.log("Location permission denied!");
      }
    };

    requestLocationPermission();
    const fetchAddress = async () => {
      const locate = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps: false, language: "ko" }
      );
      if (locate.length > 0) {
        const {
          street,
          subregion,
          city,
          region,
          country,
          district,
          streetNumber,
        } = locate[0];
        const addressString = `${country}, ${region}, ${district} ${street}, ${streetNumber}`;
        setAddress(addressString);
        // console.log(locate);
        // console.log(addressString);
      }
      // console.log(locate);
    };
    fetchAddress();

    // 컴포넌트가 언마운트될 때 효과를 정리하는 함수를 반환합니다.
  }, [latitude, longitude]);

  return (
    <View style={styles.mapscreen}>
      <MapView // 셀프클로징해도 되지만 후의 마커를 위해서
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          pinColor="#2D63E2"
          title="하이"
          description="테스트"
        />
      </MapView>
    </View>
  );
};

function FontText({ fontFileName, children }) {
  const isFontLoaded = useCustomFont(fontFileName);

  if (!isFontLoaded) {
    return null;
  }

  return <Text style={styles.text}>{children}</Text>;
}



export default function Fishmodal({
  data,
  fishModalVisible,
  setfishModalVisible,
  navigation
}) {
  console.log(data.imageArray)
  const [user, setUser] = useRecoilState(userId);
  const [selectedFish, setSelectedFish] = useState(data.category);
  const [size, setSize] = useState();
  const [address, setAddress] = useState(""); // Create a state to store address in DogamDetail
  const navi = useNavigation()
  const handleGoBack = () => {
    navigation.goBack();
  };
  const savefish = () => {
    setfishModalVisible(false);
    // console.log(data.imageArray.replace('/',''))
    try {
      const recordRequestDto = {
        'length': Number(data.length),
        'latitude': defaultLat,
        'longitude': defaultLon,
        'fishId': fishid[selectedFish],
        'base64' : encode(data.imageArray)
      };
      axios({
        method : 'post',
        url : 'http://54.206.147.12/records',
        data : recordRequestDto,
        headers: {
          userId : user,
          'Content-Type': 'application/json'
        },
      }).then((res) => {
        console.log(res.data)
        // navi.navigate("DogamScreen") 수정해야함
        navi.navigate("Home")
      }).catch((e)=> {
        console.log(e)
      })

    } catch (error) {
      console.error('Error saving data:', error);
    }
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

  const [myLocate,setMyLocate] = useRecoilState(myLocation)
  const fontFileName=require("../assets/fonts/Yeongdeok_Blueroad.ttf");
  const [defaultLat, setDefaultLat] = useState(37.541);
  const [defaultLon, setdefaultLon] = useState(126.986);
  const getLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    console.log(longitude,1);
      console.log(latitude,2);
    if (defaultLon !== longitude && defaultLat !== latitude) {
      setDefaultLat(latitude);
      setdefaultLon(longitude);
      console.log(defaultLon,3);
      console.log(defaultLat,4);
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
      <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={handleGoBack} style={{ marginBottom: 5 }}>
            <Icon name="arrow-left" size={35} color="#000" />
          </TouchableOpacity>
        </View>

          <View style={{ backgroundColor: "#FCFCFC" }}>
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  width: "90%",
                  marginTop: 20,
                  borderColor: "gray",
                  borderBottomWidth: 1,
                  marginBottom: 25,
                }}
              ></View>
            </View>

            <View style={{ width: "100%", height: 300 }}>
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${data.imageArray}`,
                }}
                style={styles.dogamItem}
                resizeMode="contain"
              />
            </View>

            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  width: "90%",
                  marginTop: 20,
                  marginBottom: 20,
                  borderColor: "gray",
                  borderBottomWidth: 1,
                }}
              ></View>
            </View>
            <View style={styles.detail}>
              <View style={{ marginBottom: 10 }}>
                  <Text style={{ fontSize: 25 }}>세부기록</Text>
              </View>
              <View style={styles.inputRow}>
                <Text style={styles.inputLabel}>
              <FontText
                fontFileName={require("../assets/fonts/Yeongdeok_Blueroad.ttf")}
                >어종
  </FontText>
                </Text>
                <View style={[styles.inputContainer, { justifyContent: "flex-start"}]}>
  <Picker
    style={styles.picker} // picker 스타일 수정
    selectedValue={selectedFish}
    onValueChange={(itemValue, index) => setSelectedFish(itemValue)}
  >
    <Picker.Item label="선택하세요" value="" />
    {fishlist.map((fish, index) => (
      <Picker.Item key={index} labelStyle={{ ...styles.pickerItemLabel, fontFamily: require("../assets/fonts/Yeongdeok_Blueroad.ttf") }} label={fish} value={fish} />
    ))}
  </Picker>
</View>


</View>


<View style={[styles.inputRow,{marginBottom:10}]}>
    <Text  style={styles.inputLabel}>              
    <FontText
                fontFileName={require("../assets/fonts/Yeongdeok_Blueroad.ttf")}
                >크기</FontText></Text>

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


              <View style={[styles.inputRow,{marginBottom:10}]}>
              <Text  style={styles.inputLabel}>              
    <FontText
                fontFileName={require("../assets/fonts/Yeongdeok_Blueroad.ttf")}
                >양력 날짜</FontText></Text>
                <View>
                <Text  style={styles.inputLabel}>              
    <FontText
                fontFileName={require("../assets/fonts/Yeongdeok_Blueroad.ttf")}
                >{solardate}</FontText></Text>
                </View>
              </View>
              <View style={[styles.inputRow,{marginBottom:10}]}>
              <Text  style={styles.inputLabel}>              
    <FontText
                fontFileName={require("../assets/fonts/Yeongdeok_Blueroad.ttf")}
                >음력 날짜</FontText></Text>
        <View>
        <Text  style={styles.inputLabel}>              
    <FontText
                fontFileName={require("../assets/fonts/Yeongdeok_Blueroad.ttf")}
                >{lunarDate}</FontText></Text>
        </View>
      </View>

              <View style={[styles.inputRow,{marginBottom:10}]}>
              <Text  style={styles.inputLabel}>              
    <FontText
                fontFileName={require("../assets/fonts/Yeongdeok_Blueroad.ttf")}
                >물때</FontText></Text>
                        <Text  style={styles.inputLabel}>              
    <FontText
                fontFileName={require("../assets/fonts/Yeongdeok_Blueroad.ttf")}
                >{water}물</FontText></Text>
        </View>

              <View style={styles.inputRow}>
              <Text  style={styles.inputLabel}>              
    <FontText
                fontFileName={require("../assets/fonts/Yeongdeok_Blueroad.ttf")}
                >장소</FontText></Text>
                <View style={{ width: "80%", flexDirection: "row" }}>
  <FontText fontFileName={require("../assets/fonts/Yeongdeok_Blueroad.ttf")}>
    <Text>{address}</Text>
  </FontText>
</View>

              </View>
            </View>
            <View style={{ flex: 1, marginTop: 25, marginBottom: 20 }}>
              <GoogleMap
                latitude={myLocate[0]}
                longitude={myLocate[1]}
                setAddress={setAddress}
              ></GoogleMap>
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
      </ScrollView>
    </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
  },
  dogamItem: {
    width: "100%",
    height: "100%",
  },
  dogamDateItem: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  mapscreen: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "90%",
    height: 200,
  },
  detail: {
    paddingHorizontal: 20,
    marginHorizontal: 20,
  },
  text: {
    fontFamily: "customFont",
    fontSize: 18,
  },
  flatList: {
    flex: 1,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  inputLabel: {
    width: 100,
  },
  inputContainer: {
    flex: 1,
    height:50,
    // borderColor: "#ced4da",
    // borderWidth: 1,
    // borderRadius: 5,
    borderColor: "#ced4da",
  // borderBottomWidth: 1, // 밑줄 두께 설정
  },
  picker: {
    height: 30,
    paddingLeft: 10,
    flex: 1,
  },
  
  input: {
    // height: 30,
    // width: "90%",
    // paddingLeft: 10,
    height: 30,
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    flex: 1,
  },
  pickerItem: {
    fontSize: 14,
    color: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    bottom: "5%",
    justifyContent: "center",
    width: "100%",
    marginTop:10,
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
  pickerItemLabel: {
    fontSize: 18,
    color: "#333", // 원하는 색상으로 변경
  },
});


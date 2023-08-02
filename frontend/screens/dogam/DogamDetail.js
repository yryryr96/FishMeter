import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Share,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import useCustomFont from "../../font/useCustomFont";

const DATA = [
  {
    id: "1",
    size: 174,
    date: 20230105,
    weather: "cloud",
    title: "Item1",
    // lat: 35.1594965345398, // 위도
    // lon: 129.162576586723, // 경도
    lat: 35.1566418,
    lon: 129.0560026,
    src1: "https://i.pinimg.com/564x/19/02/bf/1902bfda106132319c2d38f9341bcc8b.jpg",
    src2: require("../../assets/dogam_number/Gamsoung.png"),
  },
];

const weatherIcon = {
  0: {
    icon: "weather-sunny",
  },
  1: {
    icon: "weather-pouring", // 소나기..?
  },
  2: {
    icon: "weather-rainy", // 비
  },
  3: {
    icon: "weather-snowy", // 눈
  },
  4: {
    icon: "weather-windy", // 바람
  },
};

const GoogleMap = ({ latitude, longitude, setAddress }) => {
  useEffect(() => {
    // Nominatim API를 사용하여 주소 정보를 가져오는 함수를 정의합니다.

    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        // 위치 권한이 허용된 경우 주소 정보를 가져옵니다.
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
        console.log(locate);
        console.log(addressString);
      }
      console.log(locate);
    };
    fetchAddress();

    // 컴포넌트가 언마운트될 때 효과를 정리하는 함수를 반환합니다.
  }, [latitude, longitude]);

  return (
    <View style={styles.mapscreen}>
      <MapView // 셀프클로징해도 되지만 후의 마커를 위해서
        style={styles.map}
        initialRegion={{
          latitude: DATA[0].lat,
          longitude: DATA[0].lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: DATA[0].lat,
            longitude: DATA[0].lon,
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

const random = [
  "이게바로 낚시의 즐거움?",
  "즐거웠다",
  "행복했다",
  "재밌었다.",
  "또 가고싶다",
  "꺄",
];
const randomIndex = Math.floor(Math.random() * random.length);
const randomValue = random[randomIndex];

const DogamDetail = ({ route, navigation }) => {
  const [address, setAddress] = useState(""); // Create a state to store address in DogamDetail

  const handleGoBack = () => {
    navigation.goBack();
  };

  const { itemSize } = route.params;
  const { itemName } = route.params;
  const { itemSrc } = route.params;

  console.log(itemSrc);
  console.log(itemSize);
  console.log(itemName);

  const viewRef = useRef();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity onPress={handleGoBack} style={{ marginBottom: 5 }}>
            <Icon name="arrow-left" size={35} color="#000" />
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              onPress={async () => {
                const uri = await viewRef.current
                  .capture()
                  .catch((err) => console.log(err));
                await Sharing.shareAsync(
                  Platform.OS === "ios" ? `file://${uri}` : uri,
                  {
                    mimeType: "image/png",
                    dialogTitle: "공유하기",
                    UTI: "image/png",
                  }
                );
              }}
            >
              <Icon
                name="share-variant"
                size={30}
                color="#000"
                style={{ paddingHorizontal: 10 }}
              />
            </Pressable>
            <Icon
              name="trash-can-outline"
              size={35}
              color="#000"
              style={{ paddingHorizontal: 10 }}
            />
          </View>
        </View>

        <ViewShot
          ref={viewRef}
          options={{ fileName: "shared", format: "png", quality: 1 }}
        >
          <View style={{ backgroundColor: "#FCFCFC" }}>
            <View style={{ width: "100%", height: 300 }}>
              <Image
                source={{
                  uri: itemSrc,
                }}
                style={styles.dogamItem}
              />
            </View>
            <View
              style={{
                padding: 20,
                marginHorizontal: 20,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
              }}
            >
              <Text>{DATA[0].date}</Text>
              <FontText
                fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
              >
                날씨 <Icon size={20} name={weatherIcon[0].icon} />
              </FontText>
              <FontText
                fontFileName={require("../../assets/fonts/Yeongdeok_Blueroad.ttf")}
              >
                {address}에서 감성돔 {itemSize}cm짜리를 잡았다.
              </FontText>
              {console.log(randomIndex)}
              <FontText
                fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
              >
                {randomValue}
              </FontText>
            </View>

            <View style={styles.detail}>
              <FontText
                fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
              >
                <Text style={{ fontSize: 25 }}>세부기록</Text>
              </FontText>
              <FontText
                fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
              >
                어종 {itemSize}
              </FontText>
              <FontText
                fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
              >
                크기 {itemSize}cm
              </FontText>
              <FontText
                fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
              >
                날짜
              </FontText>
              <FontText
                fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
              >
                장소 {address}
              </FontText>
            </View>
            <View style={{ flex: 1 }}>
              <GoogleMap
                latitude={DATA[0].lat}
                longitude={DATA[0].lon}
                setAddress={setAddress}
              ></GoogleMap>
            </View>
          </View>
        </ViewShot>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DogamDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FCFCFC",
  },
  dogamItem: {
    width: "100%",
    height: "100%",
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
    padding: 20,
    margin: 20,
  },
  text: {
    fontFamily: "customFont",
    fontSize: 18,
  },
});
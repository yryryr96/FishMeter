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
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-maps";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as Location from "expo-location";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import useCustomFont from "../../font/useCustomFont";
import Lunar from "./Lunar";

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
  },
];

const DateData = [
  {
    id: "3",
    size: 20,
    date: 20230105,
    title: "감성돔",
    lat: 35.1566418,
    lon: 129.0560026,
    src1: "data:image/jpeg;base64,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",
  },
  {
    id: "4",
    size: 32,
    date: 20230105,
    title: "참치",
    lat: 35.1566418,
    lon: 129.0560026,
    src1: "data:image/jpeg;base64,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",
  },
  {
    id: "2",
    size: 32,
    date: 20230105,
    title: "가자미",
    lat: 35.1566418,
    lon: 129.0560026,
    src1: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPNRnAHRpBDzM6hWNboBVm4PwSC3Ij0jf8Sg&usqp=CAU",
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

const DogamDetail = ({ route, navigation }) => {
  const [address, setAddress] = useState(""); // Create a state to store address in DogamDetail
  const solardate = "2023-08-07";

  const handleGoBack = () => {
    navigation.goBack();
  };

  const renderDateItem = ({ item }) => {
    return (
      <View
        style={{
          marginTop: 10,
          marginRight: 12,
          height: 100,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.push("DogamDetail", {
              itemId: item.id,
              itemName: item.title,
              itemSize: item.size,
              itemSrc: item.src1,
              latitude: item.lat,
              longitude: item.lon,
            });
          }}
        >
          <View
            style={{
              // backgroundColor: "skyblue",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: 80, height: 80 }}>
              <Image
                source={{ uri: item.src1 }}
                style={[styles.dogamDateItem]}
                resizeMode="stretch"
              />
            </View>
            <View>
              <Text>{item.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const { itemSize } = route.params;
  const { itemName } = route.params;
  const { itemSrc } = route.params;

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
            <View style={{ paddingHorizontal: 15, marginHorizontal: 20 }}>
              <FontText
                fontFileName={require("../../assets/fonts/Yeongdeok_Blueroad.ttf")}
              >
                이날 잡은 물고기
              </FontText>
              <View style={styles.flatList}>
                <FlatList
                  data={DateData}
                  horizontal
                  renderItem={renderDateItem}
                  keyExtractor={(item) => item.id}
                ></FlatList>
              </View>
            </View>

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
                  uri: itemSrc,
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
                <FontText
                  fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
                >
                  <Text style={{ fontSize: 25 }}>세부기록</Text>
                </FontText>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: 80 }}>
                  <FontText
                    fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
                  >
                    <Text>어종</Text>
                  </FontText>
                </View>
                <View>
                  <FontText
                    fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
                  >
                    <Text>{itemName}</Text>
                  </FontText>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ width: 80 }}>
                  <FontText
                    fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
                  >
                    <Text>크기</Text>
                  </FontText>
                </View>
                <View>
                  <FontText
                    fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
                  >
                    <Text>{itemSize}cm</Text>
                  </FontText>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View style={{ width: 80 }}>
                  <FontText
                    fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
                  >
                    <Text>양력날짜</Text>
                  </FontText>
                </View>
                <View>
                  <FontText
                    fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
                  >
                    <Text>xxxx년 xx월 xx일</Text>
                  </FontText>
                </View>
              </View>

              <Lunar solardate={solardate} />

              <View style={{ flexDirection: "row" }}>
                <View style={{ width: 80 }}>
                  <FontText
                    fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
                  >
                    <Text>장소</Text>
                  </FontText>
                </View>
                <View>
                  <FontText
                    fontFileName={require("../../assets/fonts/Yeongdeok_Sea.ttf")}
                  >
                    <Text>{address}</Text>
                  </FontText>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, marginTop: 25, marginBottom: 20 }}>
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
});
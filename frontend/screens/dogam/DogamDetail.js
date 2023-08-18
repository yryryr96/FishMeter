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
  Alert,
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
import axios from "axios";
import { useRecoilState } from "recoil";
import { userId } from "../../component/recoil/selectors/testSelector";

const GoogleMap = ({ latitude, longitude }) => {
  const lat = latitude;
  const lon = longitude;

  return (
    <View style={styles.mapscreen}>
      <MapView // 셀프클로징해도 되지만 후의 마커를 위해서
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lon,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        provider={PROVIDER_GOOGLE}
      >
        <Marker
          coordinate={{
            latitude: lat,
            longitude: lon,
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
  const [user, setUser] = useRecoilState(userId);
  const [sameDate, setSameDate] = useState([]);
  const { itemId } = route.params;
  const { itemName } = route.params;
  const { itemSize } = route.params;
  const { itemSrc } = route.params;
  const { itemDate } = route.params;
  const { itemAddress } = route.params;
  const { itemLat } = route.params;
  const { itemLon } = route.params;

  const solardate = itemDate.slice(0, 10);

  const findImages = (recordId, recordTime) => {
    console.log(recordId);
    console.log(recordTime);
    axios({
      method: "get",
      url: `http://54.206.147.12/image/${recordId}/${recordTime}`,
      headers: {
        userId: user,
      },
    })
      .then((res) => {
        setSameDate(res.data);
        //console.log(res.data);
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  };
  useEffect(() => {
    findImages(itemId, itemDate);
  }, []);

  const deleteRecord = (recordId) => {
    Alert.alert("알림", "삭제하시겠습니까?", [
      {
        text: "취소",
        onPress: () => {},
      },
      {
        text: "네",
        onPress: () => {
          axios({
            method: "delete",
            url: `http://54.206.147.12/records/${recordId}`,
          })
            .then((res) => {
              alert("삭제되었습니다");
              navigation.goBack();
            })
            .catch((err) => {
              console.log("삭제에러 삐빅", err);
            });
        },
      },
    ]);
  };

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
              itemSize: item.length,
              itemName: item.species,
              itemSrc: item.imageUrl,
              itemDate: item.createdAt,
              itemAddress: item.address,
              itemLat: item.latitude,
              itemLon: item.longitude,
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
                source={{ uri: item.imageUrl }}
                style={[styles.dogamDateItem]}
                resizeMode="stretch"
              />
            </View>
            <View>
              <Text>{item.species}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

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
            <Pressable onPress={() => deleteRecord(itemId)}>
              <Icon
                name="trash-can-outline"
                size={35}
                color="#000"
                style={{ paddingHorizontal: 10 }}
              />
            </Pressable>
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
                  data={sameDate}
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
                    <Text>{solardate}</Text>
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
                    <Text>{itemAddress}</Text>
                  </FontText>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, marginTop: 25, marginBottom: 20 }}>
              <GoogleMap latitude={itemLat} longitude={itemLon}></GoogleMap>
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

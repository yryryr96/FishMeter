import {
    View,
    StyleSheet,
    TouchableOpacity,
    Text,
    Image,
    Touchable,
    StatusBar,
  } from "react-native";
  import { Marker } from "react-native-maps";
  import MapView from "react-native-maps";
  import {
    myLocation,
    testDefaultGps,
    userId,
  } from "./component/recoil/selectors/testSelector";
  import { useRecoilState, useRecoilValue } from "recoil";
  import axios from "axios";
  import { useCallback, useRef, useState, useEffect } from "react";
  import { Entypo } from "@expo/vector-icons";
  import NewDataModal from "./HomeScreen/NewDataModal";
  import ClickedMarkerModal from "./HomeScreen/ClickedModal";
  import * as Location from "expo-location";
  import Gps from "./spot/Gps";
  import SwitchSelector from "react-native-switch-selector";
  import { SafeAreaProvider } from "react-native-safe-area-context";
  import { SafeAreaView } from "react-native-safe-area-context";
  import RNEventSource from "react-native-event-source";
  
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { useNavigation } from "@react-navigation/native";
    
  export default function Home() {
    const navigation = useNavigation();
    const [myLocate,setMyLocate] = useRecoilState(myLocation)
    const [newData, setNewData] = useState([]);
    const [newMarker, setNewMarker] = useState([]);
    const [newMessage, setNewMessage] = useState([]);
    const [user, setUser] = useRecoilState(userId);
    const [userCount, setUserCount] = useState(0)
    
    // 모달
    const [newDataModalVisible, setNewDataModalVisible] = useState(false);
    const [ClickedMarkerModalVisible, setClickedMarkerModalVisible] = useState(false);
    
    // 마커의 키
    const [MarkerKey, setMarkerKey] = useState(0);
    const getMarkerKey = (value) => {
      setMarkerKey(value);
      setClickedMarkerModalVisible(true);
    };
    //
  
    //
    const mapRef = useRef(null);
    const getLocation = async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();
  
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);
  
      if (myLocate[0] !== latitude && myLocate[1] !== longitude) {
        setMyLocate([latitude,longitude])
      }
  
      if (mapRef.current) {
        mapRef.current.animateToRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.07, // 예시로 작은 값 사용
          longitudeDelta: 0.07, // 예시로 작은 값 사용
        });
      }
    };
    //
    useEffect(() => {
      getLocation();
  
      // SSE
      const es = new RNEventSource("http://54.206.147.12/sse/connect", {
        headers: { userId: user },
      });
  
      es.addEventListener("count", (event) => {
        const date = new Date();
        console.log("connect", date.toLocaleTimeString());
        const eventData = JSON.parse(event.data);
        setUserCount(eventData)
        console.log("현재유저 메시지 이벤트:", eventData);
      });
  
      es.addEventListener("update", (event) => {
        const eventData = JSON.parse(event.data);
        console.log("업데이트 메시지 이벤트:", eventData);
        setNewData((prev) => [...prev, eventData]);
        setNewMarker((prev) => [...prev, eventData]);
        const newM = [
          // data[data.length - 1]["id"],
          eventData['nickName'],
          eventData['species'],
          eventData['length'],
        ];
        setNewMessage((prev) => [...prev, newM].slice(-7));
      });
  
      // SSE 연결이 닫히면 다시 연결합니다.
      es.addEventListener("close", (event) => {
        console.log("SSE 연결이 종료되었습니다. 재연결 중...");
        // es.reconnect(); // 서버로 재연결합니다.
      });
    
      return () => {
        // 컴포넌트가 언마운트될 때 SSE 연결을 닫습니다.
        // es.removeAllEventListeners();
        console.log("종료");
        es.close();
      };
    }, [user]);
    
    const goSpot = () => {
      setState(false);
      setNewMessage([]);
    };
  
    const goAlram = () => {
      setNewDataModalVisible(true);
      setNewMessage([]);
    };
    const [state, setState] = useState(true);
    const options = [
      { label: "실시간", value: "1" },
      { label: "스팟 조회", value: "2" },
    ];
    return (
      // <SafeAreaProvider style={styles.container}>
      <SafeAreaProvider style={styles.container}>
        {state ? (
          <View>
            <SafeAreaView>
              <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                  latitude: myLocate[0],
                  longitude: myLocate[1],
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                }}
                rotateEnabled={false}
                // zoomEnabled={false}
              >
                {newMarker.map((item, index) => (
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: item.latitude,
                      longitude: item.longitude,
                    }}
                    title={String(item.id)}
                    description={item.title}
                    icon={require("./assets/location.png")}
                    onPress={() => getMarkerKey(index)}
                  />
                ))}
              </MapView>
            </SafeAreaView>
  
            <View style={styles.newModal}>
              {newData.length !== 0 ? (
                <View>
                  <View style={{ right: 10 }}>
                    <TouchableOpacity onPress={goAlram}>
                      <Image
                        style={{ left:20,top: "-50%", width: 150, height: 150 }}
                        source={require("./assets/Fishing-unscreen.gif")}
                      />
                    </TouchableOpacity>
                  </View>
  
                  <View style={styles.balloonContainer}>
                    <View style={styles.balloon}>
                      <Text style={styles.alramText}>
                        {newData.length}개의 알림이 있습니다.
                      </Text>
                    </View>
                    <View style={styles.triangle} />
                  </View>
                </View>
              ) : (
                <></>
              )}
            </View>
  
            <View style={{ top: "8%", left: "7%", position: "absolute"}}>
                <Image
                  source={require('./assets/live.gif')}
                  style={{marginLeft:"-5%", width:120, height:40}}
                />
                <Text style={{fontSize:18,marginTop: 10,fontWeight:'bold'}}>현재 접속자 : {userCount}</Text>
            </View>
  
            {/* 실시간 알림 */}
            <View style={{alignItems : 'center'}}>
              <View
                style={{
                  backgroundColor: "rgba(0,0,0,0.3)",
                  position: "absolute",
                  bottom: 120,
                  width: "70%",
                  borderRadius : 10,
                }}
              >
                {/* <View>
                        <Image source={require('./assets/live.gif')} style={{width:100,height:30,margin :5}} />
                    </View> */}
                {newMessage.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      margin: 10,
                      justifyContent: "center",
                      // paddingHorizontal : 10
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      {item[0]}님이{" "}
                    </Text>
                    <Text style={{ color: "yellow", fontWeight: "bold" }}>
                      {item[2]}cm {item[1]}을/를{" "}
                    </Text>
                    <Text style={{ color: "white", fontWeight: "bold" }}>
                      잡았습니다.
                    </Text>
                  </View>
                ))}
              </View>
            </View>
  
            <NewDataModal
              newData={newData}
              newDataModalVisible={newDataModalVisible}
              setNewDataModalVisible={setNewDataModalVisible}
              setNewData={setNewData}
            ></NewDataModal>
            <ClickedMarkerModal
              item={newMarker[MarkerKey]}
              ClickedModalVisible={ClickedMarkerModalVisible}
              setClickedModalVisible={setClickedMarkerModalVisible}
            />
          </View>
        ) : (
          <Gps />
        )}
        <View style={{ position: "absolute" }}>
          {/* <Text style={{fontSize:50}}>어디</Text> */}
          <SwitchSelector
            initial={0}
            style={{ top: "10%", marginLeft: 20, width: 170 }}
            onPress={(value) => (value === "1" ? setState(true) : goSpot())}
            options={options}
            buttonColor={"#0b74f4"}
            borderColor={"#0b74f4"}
            hasPadding
          ></SwitchSelector>
        </View>
        {state ? (
          <View style={{ position: "absolute", right: 10, bottom: 110 }}>
            <TouchableOpacity
              // style={styles.categoryButton}
              onPress={() => getLocation()}
            >
              <View style={styles.homeGpsIcon}>
                <Image
                  source={require("./assets/gps.png")}
                  style={{ width: 25, height: 25 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </SafeAreaProvider>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: "100%",
      height: "100%",
    },
    newModal: {
      position: "absolute",
      top: 60,
      right: 20,
    },
    balloonContainer: {
      position: "absolute",
      backgroundColor: "transparent",
      right: 2,
      top: 75,
    },
    balloon: {
      width: 160,
      height: 40,
      backgroundColor: "rgba(0,0,0,0.5)",
      color: "white",
      borderRadius: 20,
      padding: 12,
      zIndex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    triangle: {
      position: "absolute",
      bottom: 40,
      right: 23,
      borderTopWidth: 0,
      borderLeftWidth: 10,
      borderRightWidth: 10,
      borderBottomWidth: 10,
      borderTopColor: "transparent",
      borderLeftColor: "transparent",
      borderRightColor: "transparent",
      borderBottomColor: "rgba(0,0,0,0.5)",
      zIndex: 0,
    },
    alramText: {
      fontSize: 13,
      fontWeight: "bold",
      position: "absolute",
      color: "white",
    },
    homeGpsIcon: {
      backgroundColor: "white",
      borderRadius: 30,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
  });
  
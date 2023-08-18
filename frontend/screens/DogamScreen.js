import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Animated,
  Easing,
  Dimensions,
  ImageBackground,
  StatusBar,
} from "react-native";
import Calendarcheck from "./dogam/Calendarcheck";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";
import { useRecoilState, useRecoilValue } from "recoil";
import { Dates, userDatas, userId } from "../component/recoil/selectors/testSelector";
import axios from "axios";

const screenWidth = Dimensions.get("window").width;

const DATA = [
  {
    id: 0,
    title: "쥐노래미",
    state: true,
    src1: require("../assets/fishes/movefishes/test1.gif"),
    src2: require("../assets/fishes/two.png"),
  },
  {
    id: 1,
    title: "감성돔",
    state: true,
    src1: require("../assets/fishes/movefishes/test3.gif"),
    src2: require("../assets/fishes/three.png"),
  },
  {
    id: 2,
    title: "말쥐치",
    state: false,
    src1: require("../assets/fishes/movefishes/test8.gif"),
    src2: require("../assets/fishes/eight.png"),
  },
  {
    id: 3,
    title: "돌돔",
    state: false,
    src1: require("../assets/fishes/movefishes/test7.gif"),
    src2: require("../assets/fishes/seven.png"),
  },
  {
    id: 4,
    state: false,
    title: "쏘가리",
    src1: require("../assets/fishes/movefishes/test1.gif"),
    src2: require("../assets/fishes/one.png"),
  },
  {
    id: 5,
    title: "참돔",
    state: false,
    src1: require("../assets/fishes/movefishes/test5.gif"),
    src2: require("../assets/fishes/five.png"),
  },
  {
    id: 6,
    title: "옥돔",
    state: false,
    src1: require("../assets/fishes/movefishes/test4.gif"),
    src2: require("../assets/fishes/four.png"),
  },

  {
    id: 7,
    title: "송어",
    state: true,
    src1: require("../assets/fishes/movefishes/test6.gif"),
    src2: require("../assets/fishes/six.png"),
  },
];

const Stack = createStackNavigator();

const FishAnimation = ({ fishlist, item, navigation }) => {
  const positionX = useRef(new Animated.Value(0)).current;
  const positionY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateFish();
  }, []);

  const animateFish = () => {
    const randomDurationX = 8000 + Math.random() * 10000;
    const randomDurationY = 8000 + Math.random() * 10000;
    const randomXPos = Math.random() * screenWidth;
    const randomYPos = Math.random() * 400;

    Animated.parallel([
      Animated.timing(positionX, {
        toValue: randomXPos,
        duration: randomDurationX,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
      Animated.timing(positionY, {
        toValue: randomYPos,
        duration: randomDurationY,
        easing: Easing.linear,
        useNativeDriver: false,
      }),
    ]).start(() => {
      animateFish(); // 애니메이션이 끝난 후에 다시 호출하여 계속 반복
    });
  };

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: positionX,
        top: positionY,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DogamGallery", {
            itemId: item.id,
            itemName: item.title,
          });
        }}
      >
        <View>
          <View style={{ width: 90, height: 90 }}>
            <Image
              source={item.src1}
              style={styles.itemImage}
              resizeMode="contain"
            />
          </View>
          {/* <View style={{ paddingTop: 5 }}>
            <Text style={{ fontSize: 18, fontFamily: "Yeongdeok Blueroad" }}>
              {item.title}
            </Text>
          </View> */}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const DogamScreen = ({ navigation }) => {
  const [pressedItem, setPressedItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(true); // 추가: 선택된 이미지 상태 변수

  const [icebox, setIcebox] = useState(true);
  const [calendar, setCalendar] = useState(false);
  const [listItem, setListItem] = useState(false);
  const [renderCount, setRenderCount] = useState(0);

  const [user, setUser] = useRecoilState(userId);
  const [totalDatas, setTotalDatas] = useRecoilState(userDatas);
  const customDateArray = useRecoilValue(Dates)

  const [fishlist, setFishList] = useState([]);
  // fishlist에 포함된 id만 추출하여 새로운 배열 생성
  const fishlistIds = Array.from(new Set(fishlist.map((fish) => fish.id)));
  // DATA에서 fishlist에 포함된 id만 필터링하여 새로운 배열 생성
  const filteredData = DATA.filter((fish) => fishlistIds.includes(fish.id));
  // console.log("중복제거한 데이터 : ", filteredData);
  console.log("유저 : ", user);

  // 유저가 가지고 있는 어종 데이터
  const findFish = () => {
    axios({
      method: "get",
      url: "http://54.206.147.12/fishes",
      headers: {
        userId: user,
      },
    })
      .then((res) => {
        setFishList(res.data);
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  };

  const getUserData = () => {
    axios({
      method: "get",
      url: "http://54.206.147.12/records/all",
      headers: {
        userId: user,
      },
    })
      .then((res) => {
        setTotalDatas(res.data);
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  }

  useEffect(() => {
    findFish();
    getUserData();
    
  }, []);

  // 도감 들어올때 마다 갱신
  useFocusEffect(
    useCallback(() => {
      setRenderCount((prev) => prev + 1);
      findFish();
      getUserData();
      
      return () => {};
    }, [navigation])
  );
  
  const [searchKeyword, setSearchKeyword] = useState(""); // 추가: 검색어 state
  // 검색어에 해당하는 항목들만 필터링하여 반환하는 함수
  const searchFilter = (item) => {
    return item.title.includes(searchKeyword);
  };

  const listClick = () => {
    setListItem(!listItem);
  };

  // 화면 바꿔서 보여주는 함수
  const handleImageClick = () => {
    setSelectedImage(!selectedImage);
    setIcebox(!icebox);
    setCalendar(!calendar);
  };

  const renderItem = ({ item }) => {
    console.log("렌더아이탬: ", fishlist);

    if (!fishlist.some((fish) => fish.id === item.id)) {
      // fishlist에 일치하는 id를 가진 아이템이 없다면 렌더링하지 않음
      return null;
    }

    const isPressed = pressedItem === item.id;

    return (
      <View
        style={{
          marginHorizontal: 18,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DogamGallery", {
              itemId: item.id,
              itemName: item.title,
            });
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15,
            }}
          >
            <View style={{ width: 90, height: 90 }}>
              <Image
                source={item.src2}
                style={[
                  styles.dogamItem,
                  isPressed ? styles.itemPressed : null,
                ]}
                resizeMode="contain"
              />
            </View>
            <View style={{ paddingTop: 5 }}>
              <Text style={{ fontSize: 18, fontFamily: "Yeongdeok Blueroad" }}>
                {item.title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dogam}>
        <View
          style={{
            width: "100%",
            flexDirection: "row", // 가로 방향으로 정렬
            marginBottom: 10,
          }}
        >
          <TouchableOpacity onPress={() => handleImageClick()}>
            {!icebox ? (
              <View style={styles.changeButton}>
                <Image
                  source={require("../assets/Gallery/icebox_close.png")}
                  style={{ width: 70, height: 70 }}
                />
              </View>
            ) : (
              <View style={styles.changeButton}>
                <Image
                  source={require("../assets/Gallery/icebox_open.png")}
                  style={{ width: 70, height: 70 }}
                />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleImageClick()}>
            {!calendar ? (
              <View style={styles.changeButton}>
                <Image
                  source={require("../assets/Gallery/calendar_close.png")}
                  style={{ width: 50, height: 50 }}
                />
              </View>
            ) : (
              <View style={styles.changeButton}>
                <Image
                  source={require("../assets/Gallery/calendar-open-unscreen.gif")}
                  style={{ width: 70, height: 70 }}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* 선택된 이미지가 있을 경우에만 아래 내용 표시 */}
        {selectedImage === true && (
          <>
            <View
              style={{
                //marginTop: 10,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, fontFamily: "Yeongdeok Blueroad" }}>
                어종
              </Text>
              <Text style={{ fontSize: 20, fontFamily: "Yeongdeok Blueroad" }}>
                잡은 수 : {totalDatas.length}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                style={{
                  width: 300,
                  height: 40,
                  borderColor: "gray",
                  paddingHorizontal: 15,
                  marginTop: 20,
                  borderRadius: 20,
                  borderWidth: 0.2,
                  marginBottom: 20,
                  fontFamily: "Yeongdeok Blueroad",
                  marginLeft: 10,
                }}
                onChangeText={(text) => setSearchKeyword(text)}
                value={searchKeyword}
                placeholder="어종을 입력하세요"
              />
              <View style={{ width: 50, marginLeft: 15 }}>
                {listItem === false && (
                  <Icon
                    name="format-list-bulleted"
                    size={35}
                    color="#000"
                    onPress={() => listClick()}
                  />
                )}
                {listItem === true && (
                  <Icon
                    name="fishbowl"
                    size={38}
                    color="#000"
                    onPress={() => listClick()}
                  />
                )}
              </View>
            </View>
            {listItem === false && (
              <ImageBackground
                style={styles.fishAnimationContainer}
                source={require("../assets/Gallery/underthesea.gif")}
              >
                {filteredData.filter(searchFilter).map((item) => (
                  <FishAnimation
                    key={item.id}
                    fishlist={fishlist}
                    item={item}
                    navigation={navigation}
                  />
                ))}
              </ImageBackground>
            )}
            {listItem === true && (
              <View style={styles.flatList}>
                <FlatList
                  data={filteredData.filter(searchFilter)}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  numColumns={3}
                ></FlatList>
              </View>
            )}
          </>
        )}
        {/* 선택된 이미지에 따라 Calendar 컴포넌트 조건부 렌더링 */}
        {selectedImage === false && (
          <View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 30, fontFamily: "Yeongdeok Blueroad" }}>
                날짜
              </Text>
            </View>
            <View style={{ width: 400, marginTop: 20 }}>
              <Calendarcheck navigation={navigation} customDateArray={customDateArray} />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default DogamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FCFCFC",
  },
  dogamItem: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  dogam: {
    //justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  title: {
    color: "black",
    textAlign: "center",
    fontSize: 36,
  },
  catchCnt: {
    color: "black",
    textAlign: "center",
    fontSize: 18,
  },
  flatList: {
    flex: 1,
    paddingBottom: 55,
  },
  text: {
    fontFamily: "customFont",
    fontSize: 18,
    textAlign: "center",
  },
  changeButton: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginHorizontal: 15,
  },
  itemImage: {
    width: "100%",
    height: "100%",
    opacity: 0.85,
  },
  fishAnimationContainer: {
    width: screenWidth,
    height: 500,
  },
});

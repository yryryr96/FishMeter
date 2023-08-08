import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import DogamGallery from "./dogam/DogamGallery";
import useCustomFont from "../font/useCustomFont";
import Calendarcheck from "./dogam/Calendarcheck";

const DATA = [
  {
    id: "1",
    state: false,
    title: "쏘가리",
    src1: require("../assets/fishes/쏘가리.jpg"),
  },
  {
    id: "2",
    title: "쥐노래미",
    state: true,
    src1: require("../assets/fishes/쥐노래미.png"),
  },
  {
    id: "3",
    title: "감성돔",
    state: true,
    src1: require("../assets/fishes/감성돔.jpg"),
  },
  {
    id: "4",
    title: "옥돔",
    state: false,
    src1: require("../assets/fishes/옥돔.png"),
  },
  {
    id: "5",
    title: "참돔",
    state: false,
    src1: require("../assets/fishes/참돔.jpg"),
  },
  {
    id: "6",
    title: "송어",
    state: true,
    src1: require("../assets/fishes/송어.png"),
  },
  {
    id: "7",
    title: "돌돔",
    state: false,
    src1: require("../assets/fishes/돌돔.jpg"),
  },
  {
    id: "8",
    title: "말쥐치",
    state: false,
    src1: require("../assets/fishes/말쥐치.jpg"),
  },
];


function FontText({ fontFileName, children }) {
  const isFontLoaded = useCustomFont(fontFileName);

  if (!isFontLoaded) {
    return null;
  }

  return <Text style={styles.text}>{children}</Text>;
}

const Stack = createStackNavigator();

const DogamScreen = ({ navigation }) => {
  const [pressedItem, setPressedItem] = useState(null);
  // const [selectedImage, setSelectedImage] = useState(
  //   "https://thumb.ac-illust.com/ba/ba2f532c978df3f103d4b389fb6090e3_t.jpeg"
  // ); // 추가: 선택된 이미지 상태 변수
  const [selectedImage, setSelectedImage] = useState(true); // 추가: 선택된 이미지 상태 변수

  const [icebox, setIcebox] = useState(true);
  const [calendar, setCalendar] = useState(false);

  const [searchKeyword, setSearchKeyword] = useState(""); // 추가: 검색어 state
  // 검색어에 해당하는 항목들만 필터링하여 반환하는 함수
  const searchFilter = (item) => {
    return item.title.includes(searchKeyword);
  };

  // 화면 바꿔서 보여주는 함수
  const handleImageClick = () => {
    setSelectedImage(!selectedImage);
    setIcebox(!icebox);
    setCalendar(!calendar);
  };

  const renderItem = ({ item }) => {
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
                source={item.src1}
                style={[
                  styles.dogamItem,
                  isPressed ? styles.itemPressed : null,
                ]}
                resizeMode="contain"
              />
            </View>
            <View style={{ paddingTop: 5 }}>
              <Text>{item.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ImageBackground
        source={require("../assets/fishbowl.gif")}
        resizeMode="cover"
      > */}

      <View style={styles.dogam}>
        <View
          style={{
            //backgroundColor: "pink",
            position: "absolute",
            zIndex: 1,
            top: "0%",
            marginTop: 25,
            width: "100%",
            justifyContent: "center",
            flexDirection: "row", // 가로 방향으로 정렬
            //justifyContent: "center", // 자식들 사이에 공간을 나눔
            //width: "90%", // 부모 View의 90% 너비로 설정
          }}
        >
          <TouchableOpacity onPress={() => handleImageClick()}>
            {!icebox ? (
              <View style={styles.changeButton}>
                <Image
                  source={require("../assets/Gallery/icebox_close.jpeg")}
                  style={{ width: 60, height: 60 }}
                />
              </View>
            ) : (
              <View style={styles.changeButton}>
                <Image
                  source={require("../assets/Gallery/icebox_open.png")}
                  style={{ width: 60, height: 60 }}
                />
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleImageClick(
                "https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-c4d-stereo-calendar-free-download-image_1183607.jpg"
              )
            }
          >
            {!calendar ? (
              <View style={styles.changeButton}>
                <Image
                  source={{
                    uri: "https://png.pngtree.com/element_our/20190528/ourlarge/pngtree-c4d-stereo-calendar-free-download-image_1183607.jpg",
                  }}
                  style={{ width: 60, height: 60 }}
                />
              </View>
            ) : (
              <View style={styles.changeButton}>
                <Image
                  source={require("../assets/Gallery/calendar_open.png")}
                  style={{ width: 60, height: 60 }}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View
          style={{
            flex: 0.3,
            backgroundColor: "gray",
            height: 50,
            width: 500,
          }}
        >
          <Image
            source={require("../assets/Gallery/fishbowl.gif")}
            style={{ width: "100%", height: 150 }}
          />
        </View>
        {/* 선택된 이미지가 있을 경우에만 아래 내용 표시 */}
        {selectedImage === true && (
          <>
            <View style={{ marginTop: 30 }}>
              <FontText
                fontFileName={require("../assets/fonts/Yeongdeok_Sea.ttf")}
              >
                <Text style={{ fontSize: 30 }}>어종</Text>
              </FontText>
              <FontText
                fontFileName={require("../assets/fonts/Yeongdeok_Sea.ttf")}
              >
                <Text style={styles.catchCnt}>잡은 수 : 7</Text>
              </FontText>
            </View>
            <TextInput
              style={{
                width: 300,
                height: 40,
                borderColor: "gray",
                paddingHorizontal: 10,
                marginTop: 20,
                borderRadius: 20,
                borderWidth: 0.2,
                marginBottom: 20,
              }}
              onChangeText={(text) => setSearchKeyword(text)}
              value={searchKeyword}
              placeholder="어종을 입력하세요"
            />

            <View style={styles.flatList}>
              <FlatList
                data={DATA.filter(searchFilter)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={3}
              ></FlatList>
            </View>
          </>
        )}
        {/* 선택된 이미지에 따라 Calendar 컴포넌트 조건부 렌더링 */}
        {selectedImage === false && (
          <View>
            <View style={{ marginTop: 140 }}>
              <FontText
                fontFileName={require("../assets/fonts/Yeongdeok_Sea.ttf")}
              >
                <Text style={{ fontSize: 30 }}>날짜</Text>
              </FontText>
            </View>
            <View style={{ width: 400, marginTop: 20 }}>
              <Calendarcheck navigation={navigation} />
            </View>
          </View>
        )}
      </View>
      {/* </ImageBackground> */}
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
});
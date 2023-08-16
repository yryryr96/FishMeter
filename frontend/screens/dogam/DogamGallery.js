import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";
import { useRecoilState } from "recoil";
import { userId } from "../../component/recoil/selectors/testSelector";

const DogamGallery = ({ route, navigation }) => {
  const [data, setData] = useState([]);
  const [selectedButton, setSelectedButton] = useState(""); // 선택한 버튼을 추적하기 위한 상태 변수
  const [user, setUser] = useRecoilState(userId);
  const [imagelist, setImagelist] = useState([]);

  const { itemId } = route.params;
  const { itemName } = route.params;

  const findRecords = (fishId) => {
    axios({
      method: "get",
      url: `http://54.206.147.12/fishes/${fishId}`,
      headers: {
        userId: user,
      },
    })
      .then((res) => {
        setImagelist(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("삐빅", err);
      });
  };

  console.log(imagelist);
  console.log(data);

  useEffect(() => {
    findRecords(itemId);
  }, []);

  // 정렬 함수
  const handleSortBySize = () => {
    // 크기(size) 순으로 정렬
    const sortedData = [...data].sort((a, b) => b.length - a.length);
    console.log("크기순으로 정렬된 친구 ㅣ ", sortedData);
    setData(sortedData);
    setSelectedButton("size"); // 선택한 버튼을 "size"로 설정
  };

  const handleSortByDate = () => {
    // 날짜(date) 순으로 정렬
    const sortedData = [...data].sort((a, b) => b.id - a.id);
    setData(sortedData);
    setSelectedButton("date"); // 선택한 버튼을 "date"로 설정
  };

  const renderItem = ({ item }) => (
    <View
      style={{
        width: "33%",
        justifyContent: "space-around",
        flexDirection: "row",
      }}
    >
      <View style={{ width: "100%", paddingVertical: 2, paddingHorizontal: 2 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("DogamDetail", {
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
          <Image
            source={{
              uri: item.imageUrl,
            }}
            style={styles.dogamItem}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.goBack}>
          <Icon name="arrow-left" size={35} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>{itemName}</Text>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "date" && { backgroundColor: "#8BAECF" },
          ]}
          onPress={handleSortByDate}
        >
          <Icon
            name="calendar"
            size={18}
            color={selectedButton === "date" ? "white" : "gray"}
          />
          <Text
            style={[
              styles.buttonText,
              selectedButton === "date" && { color: "white" },
            ]}
          >
            날짜
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedButton === "size" && { backgroundColor: "#8BAECF" },
          ]}
          onPress={handleSortBySize}
        >
          <Icon
            name="resize"
            size={18}
            color={selectedButton === "size" ? "white" : "gray"}
          />
          <Text
            style={[
              styles.buttonText,
              selectedButton === "size" && { color: "white" },
            ]}
          >
            크기
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.gallery}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(data) => data.id}
          numColumns={3}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

export default DogamGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  goBack: {
    paddingRight: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontFamily: "Yeongdeok Blueroad",
  },
  separator: {
    paddingBottom: 15,
    marginHorizontal: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  gallery: {
    flex: 1,
    paddingHorizontal: 2,
  },
  dogamItem: {
    width: "100%",
    height: 130,
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 35,
    borderRadius: 25,
    backgroundColor: "white",
    marginLeft: 10,
    borderWidth: 0.5,
    borderColor: "gray",
  },
  buttonText: {
    fontFamily: "Yeongdeok Blueroad",
    fontSize: 15,
    marginLeft: 5,
    color: "gray",
  },
});

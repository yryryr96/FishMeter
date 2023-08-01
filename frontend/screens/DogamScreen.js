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
} from "react-native";
import DogamGallery from "./dogam/DogamGallery";
import useCustomFont from "../font/useCustomFont";

const DATA = [
  {
    id: "1",
    state: false,
    title: "Item1",
    src1: require("../assets/dogam_number/1.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "2",
    title: "감성돔",
    state: true,
    src1: require("../assets/dogam_number/1.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "3",
    title: "Item3",
    state: true,
    src1: require("../assets/dogam_number/3.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "4",
    title: "Item4",
    state: false,
    src1: require("../assets/dogam_number/4.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "5",
    title: "Item5",
    state: false,
    src1: require("../assets/dogam_number/5.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "6",
    title: "Item6",
    state: true,
    src1: require("../assets/dogam_number/6.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "7",
    title: "Item7",
    state: false,
    src1: require("../assets/dogam_number/7.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "8",
    title: "Item8",
    state: true,
    src1: require("../assets/dogam_number/8.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "9",
    title: "Item9",
    state: false,
    src1: require("../assets/dogam_number/9.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "10",
    title: "Item10",
    state: false,
    src1: require("../assets/dogam_number/10.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "11",
    title: "Item11",
    state: false,
    src1: require("../assets/dogam_number/11.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "12",
    title: "Item12",
    state: false,
    src1: require("../assets/dogam_number/12.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "13",
    title: "Item13",
    state: false,
    src1: require("../assets/dogam_number/13.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "14",
    title: "Item13",
    state: false,
    src1: require("../assets/dogam_number/14.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "15",
    title: "Item13",
    state: false,
    src1: require("../assets/dogam_number/15.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "16",
    title: "Item13",
    state: false,
    src1: require("../assets/dogam_number/16.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "17",
    title: "Item13",
    state: false,
    src1: require("../assets/dogam_number/17.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "18",
    title: "Item13",
    state: false,
    src1: require("../assets/dogam_number/18.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "19",
    title: "Item13",
    state: false,
    src1: require("../assets/dogam_number/Gamsoung.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
  },
  {
    id: "20",
    title: "Item13",
    state: false,
    src1: require("../assets/dogam_number/Gamsoung.png"),
    src2: require("../assets/dogam_number/Gamsoung.png"),
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
            navigation.navigate("DogamGallery", {
              itemId: item.id,
              itemName: item.title,
            });
          }}
        >
          <Image
            //source={item.state ? { uri: item.src2 } : item.src1}
            source={item.state ? item.src2 : item.src1}
            style={styles.dogamItem}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
        <View style={{ padding: 5 }}>
          <Image
            source={require("../assets/back_arrows.png")}
            style={{ width: 30, height: 30 }}
          />
        </View>
      </View> */}
      <View style={styles.dogam}>
        <Text style={{ marginBottom: 10 }}>
          <FontText
            fontFileName={require("../assets/fonts/Yeongdeok_Haeparang.ttf")}
          >
            <Text style={styles.title}>도감</Text>
          </FontText>
        </Text>
        <FontText fontFileName={require("../assets/fonts/Yeongdeok_Sea.ttf")}>
          <Text style={styles.catchCnt}>잡은 수 : 7</Text>
        </FontText>
      </View>
      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: "black",
          marginBottom: 10,
          // marginHorizontal: 30,
        }}
      ></View>
      <View style={styles.flatList}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

export default DogamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  dogamItem: {
    width: "100%",
    height: 130,
  },
  dogam: {
    width: "100%",
    justifyContent: "center",
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
    // width: "100%",
    // justifyContent: "center",
    // alignContent: "center",
    // paddingBottom: 40,
  },
  text: {
    fontFamily: "customFont",
    fontSize: 18,
    textAlign: "center",
  },
});
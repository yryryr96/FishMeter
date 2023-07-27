import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import DogamGallery from "./dogam/DogamGallery";

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
    title: "Item2",
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

const Stack = createStackNavigator();

const DogamScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.dogamList}
      onPress={() => {
        const itemId = item.id;
        navigation.navigate("DogamGallery", { itemId: 86 });
        console.log(item.id);
      }}
    >
      <Image
        //source={item.state ? { uri: item.src2 } : item.src1}
        source={item.state ? item.src2 : item.src1}
        style={styles.dogamItem}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <View>
        <View style={{ padding: 5 }}>
          <Image
            source={require("../assets/back_arrows.png")}
            style={{ width: 30, height: 30 }}
          />
        </View>
      </View> */}
      <View style={styles.dogam}>
        <Text style={styles.title}>도감</Text>
        <Text style={styles.catchCnt}>잡은 수 : 7</Text>
      </View>
      <View style={styles.flatList}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={4}
        ></FlatList>
      </View>

      <Text>DogamScreen</Text>
      <Button
        title="click here"
        onPress={() => alert("button clicked!")}
      ></Button>
    </View>
  );
};

export default DogamScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dogamList: {
    flex: 1,
    height: 120,
    width: "100%",
    margin: 5,
    //justifyContent: "center",
    //alignItems: "center",
  },
  dogamItem: {
    borderRadius: 8,
    width: "100%",
    height: "100%",
  },
  dogam: {
    width: "100%",
    justifyContent: "center",
    textAlign: "center",
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    marginBottom: 15,
  },
  title: {
    color: "black",
    textAlign: "center",
    fontSize: 36,
    marginBottom: 3,
  },
  catchCnt: {
    color: "black",
    textAlign: "center",
    fontSize: 18,
  },
  flatList: {
    flex: 1.2,
    width: "100%",
    justifyContent: "center",
    alignContent: "center",
    paddingBottom: 40,
  },
});

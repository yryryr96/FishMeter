**react native flatlist 사용해서 리스트 만들기**

```jsx
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { MainContainer } from "./containers";

const DATA = [
  {
    id: "1",
    title: "Item1",
    src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2638A73358CFF7AF1B",
  },
  {
    id: "2",
    title: "Item2",
    src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2638A73358CFF7AF1B",
  },
  {
    id: "3",
    title: "Item3",
    src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2638A73358CFF7AF1B",
  },
  {
    id: "4",
    title: "Item4",
    src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2638A73358CFF7AF1B",
  },
  {
    id: "5",
    title: "Item5",
    src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2638A73358CFF7AF1B",
  },
  {
    id: "6",
    title: "Item6",
    src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2638A73358CFF7AF1B",
  },
  {
    id: "7",
    title: "Item7",
    src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2638A73358CFF7AF1B",
  },
  {
    id: "8",
    title: "Item8",
    src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2638A73358CFF7AF1B",
  },
  {
    id: "9",
    title: "Item9",
    src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2638A73358CFF7AF1B",
  },
  {
    id: "10",
    title: "Item10",
    src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2638A73358CFF7AF1B",
  },
  {
    id: "11",
    title: "Item11",
    src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2638A73358CFF7AF1B",
  },
  {
    id: "12",
    title: "Item12",
    src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2638A73358CFF7AF1B",
  },
  {
    id: "13",
    title: "Item13",
    src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2638A73358CFF7AF1B",
  },
];

export default function App() {
  const renderItem = ({ item }) => (
    <View
      style={{
        margin: 10,
        felxDirection: "row",
        justifyContent: "center",
        margin: 10,
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image source={{ uri: item.src }} style={styles.tinyImage} />
        {/* <View style={{width:100}}></View> */}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text>header</Text>
      </View>
      <View style={styles.dogam}>
        <Text style={styles.text}>도감</Text>
        <Text>잡은 수 : 7</Text>
      </View>
      <View style={styles.img}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: "#fff",
  },
  header: {
    flex: 0.2,
    backgroundColor: "pink",
  },
  dogam: {
    flex: 0.3,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    borderColor: "pink",
  },
  text: {
    fontSize: 32,
  },
  img: {
    flex: 1.5,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  tinyImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    marginBottom: 10,
  },
});
```


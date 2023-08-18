import React, { useState } from "react";
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
import { useRecoilValue } from "recoil";
import { sameDateItems } from "../../component/recoil/selectors/testSelector";

const CalendarGallery = ({ route, navigation }) => {
  const { year, month, day } = route.params;
  const data = useRecoilValue(sameDateItems(`${year}-${month}-${day}`));
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
      <TouchableOpacity onPress={handleGoBack}>
        <Icon name="arrow-left" size={35} color="#000" />
      </TouchableOpacity>
      <View
        style={{
          paddingBottom: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 30,
            fontFamily: "Yeongdeok Blueroad",
          }}
        >
          {year}-{month}-{day}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
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

export default CalendarGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
  dogamItem: {
    width: "100%",
    height: 130,
  },
  button: {
    width: 70,
    height: 35,
    borderRadius: 25,
    backgroundColor: "white",
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  button_title: {
    fontSize: 15,
  },
});

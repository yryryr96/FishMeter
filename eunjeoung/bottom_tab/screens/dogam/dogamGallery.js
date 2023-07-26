import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const DogamGallery = ({ route, navigation }) => {
  const { itemId } = route.params; // itemId로 수정
  return (
    <View style={styles.container}>
      <Text>갤러리요.. 넘어왔나요..{JSON.stringify(itemId)}</Text>
      <Button
        title="click here"
        onPress={() => alert("button clicked!")}
      ></Button>
    </View>
  );
};

export default DogamGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});
